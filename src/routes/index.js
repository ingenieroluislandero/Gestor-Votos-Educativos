const express = require('express'),
	 router = express.Router()

router.get('/', (req, res) => {
  res.send('hola')
})

router.get('/about', (req, res) => {
  res.send('hola')
})

module.exports = router