const express = require('express'),
	 router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/acerca', (req, res) => {
  res.render('acerca')
})

module.exports = router