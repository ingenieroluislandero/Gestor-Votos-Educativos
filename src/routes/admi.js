const express = require('express'),
	router = express.Router()

//modelo
const Admi = require('../models/Admin')
router
	.get('/admi/admreg',(req, res)=>{
		res.render('admi/admreg')
	})
	.post('/admi/admreg', async (req,res)=>{
		
	})
	.get('/admi/admin',(req, res)=>{
		res.render('admi/admin')
	})


module.exports = router