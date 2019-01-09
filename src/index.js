const express = require('express'),
	 exphbs = require('express-handlebars'),
	 path = require('path'),
	 methodOverride = require('method-override'),
	 session = require('express-session'),
	 flash = require('connect-flash'),
	 passport = require('passport'),
	 app = express()

//Initializations
//settins
//middlewares
//gloval variables
//routes
//static files
//server is listening
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});