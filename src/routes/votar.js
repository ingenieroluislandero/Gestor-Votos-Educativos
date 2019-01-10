const express = require('express'),
	 router = express.Router()

router
	.get('/votar', (req, res)=>{
		res.send('hola a todos')
	})

module.exports = router