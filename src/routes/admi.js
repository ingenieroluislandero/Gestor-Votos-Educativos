const express = require('express'),
	router = express.Router()

router
	.get('/admi',(req, res)=>{
		res.send('soy el administrador')
	})

module.exports = router