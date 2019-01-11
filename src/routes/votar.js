const express = require('express'),
	 router = express.Router()

router
	.get('/votar', (req, res)=>{
		res.send('hola a todos')
	})
	.get('/vistaAdmi/welcome', (req, res)=>{
		res.render('vistaAdmi/welcome')
	})

module.exports = router