const express = require('express'),
	 exphbs = require('express-handlebars'),
	 path = require('path'),
	 methodOverride = require('method-override'),
	 session = require('express-session'),
	 flash = require('connect-flash'),
	 passport = require('passport'),
	 app = express()

//Initializations
require('./database')
require('./config/passport')
//settings
app
	.set('port', process.env.PORT || 3000)
	.set('views', path.join(__dirname, 'views'))
	.engine('.hbs', exphbs({
  		defaultLayout: 'main',
  		layoutsDir: path.join(app.get('views'), 'layouts'),
  		partialsDir: path.join(app.get('views'), 'partials'),
  		extname: '.hbs'
		}))
	.set('view engine', '.hbs')
//middlewares
app
	.use(express.urlencoded({extended: false}))
	.use(methodOverride('_method'))
	.use(session({
		secret: 'secrect',
		resave: true,
		saveUninitialized: true
	}))
	.use(passport.initialize())
	.use(passport.session())
	.use(flash())
//gloval variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null;
  next()
})
//routes
app
	.use(require('./routes'))
	.use(require('./routes/votar'))
	.use(require('./routes/admi'))
//static files
app	
	.use(express.static(path.join(__dirname, 'public')))
//server is listening
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
});