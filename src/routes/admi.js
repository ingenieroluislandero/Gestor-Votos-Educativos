const express = require('express'),
	passport = require('passport'),
	router = express.Router()

//modelo
const Admi = require('../models/Admin')
router
	.get('/admi/admreg',(req, res)=>{
		res.render('admi/admreg')
	})

	.post('/admi/admreg', async (req, res) => {
  		let errors = [];
  		const { nombre, gmail, password, confir_password } = req.body;
  		if(password != confir_password) {
    	errors.push({text: 'Password no es igual.'});
  		}
  		if(password.length < 4) {
    	errors.push({text: 'Passwords de tener mas de cuatro caracteres.'})
  		}
  		if(errors.length > 0){
   		 res.render('admi/admreg', {errors, nombre, gmail, password, confir_password});
  		} else {
    	// Look for email coincidence
    		const emailUser = await Admi.findOne({gmail: gmail});
    		console.log(emailUser)
    		if(emailUser) {
     		 req.flash('error_msg', 'el gmail ya existe.');
      		res.redirect('/admi/admin');
    		} else {
      	// Saving a New User
      		const newUser = new Admi({nombre, gmail, password});
      		newUser.password = await newUser.encryptPassword(password);
     		 await newUser.save();
      		req.flash('success_msg', 'registro exitoso.');
      		res.redirect('/admi/admin');
    		}
  		}
	})

	.get('/admi/admin',(req, res)=>{
		res.render('admi/admin')
	})

	.post('/admi/admin', passport.authenticate('local', {
  		successRedirect: '/vistaAdmi/welcome',
  		failureRedirect: '/admi/admin',
  		failureFlash: true
	}))

	.get('/admi/logout', (req, res) => {
  		req.logout();
  		req.flash('success_msg', 'Usted no esta Registrado.');
  		res.redirect('/admi/admreg');
	});

module.exports = router