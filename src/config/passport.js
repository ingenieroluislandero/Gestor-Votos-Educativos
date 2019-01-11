const passport = require('passport'),
   LocalStrategy = require('passport-local').Strategy,

   mongoose = require('mongoose'),
   User = require('../models/Admin') 


passport.use(new LocalStrategy({
  usernameField: 'gmail'
}, async (gmail, password, done) => {
  // Match Email's User
  const user = await User.findOne({gmail: gmail});
  if (!user) {
    return done(null, false, { message: 'pagina no encontrada.' });
  } else {
    // Match Password's User
    const match = await user.matchPassword(password);
    if(match) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'contaceña incorrecta.' });
    }
  }

}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
