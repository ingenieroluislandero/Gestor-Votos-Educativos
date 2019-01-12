const express = require('express'),
	 router = express.Router(),
	 Cand = require('../models/Candidato'),
	 {isAuthenticated} = require('../helpers/auth')

router
	.get('/vistaAdmi/add', (req, res)=>{
		res.render('vistaAdmi/agregar')
	})

	.post('/vistaAdmi/agregar', isAuthenticated , async (req, res)=>{
		const {nombre, apellido, grado, curso, lema} = req.body
		const errors = [];

		if (!nombre) {
			errors.push({text: 'escriba un nombre'})
		}
		if (!apellido) {
			errors.push({text: 'escriba un apellido'})
		}
		if (!grado) {
			errors.push({text: 'escriba un grado'})
		}
		if (!curso) {
			errors.push({text: 'escriba un curso'})
		}
		if (!lema) {
			errors.push({text: 'escriba un lema'})
		}
		if (errors.length > 0) {
			res.render('vistaAdmi/agregar', {
				nombre, apellido, grado, curso, lema
			})

		}
		else{
			const voto = 0
			const newCand = new Cand({nombre, apellido, grado, curso, lema, voto})
			newCand.admi = req.user.id 
			await newCand.save()
			req.flash('success_msg','candidato agregado con exito')
			res.redirect('/vistaAdmi/welcome')
		}

	})

	.get('/vistaAdmi/welcome', (req, res)=>{
		res.render('vistaAdmi/welcome')
	})


module.exports = router