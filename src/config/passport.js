const passport = require('passport'),
   LocalStrategy = require('passport-local').Strategy,

   mongoose = require('mongoose'),
   Admi = require('../models/Admin') 


passport.use(new LocalStrategy({
  usernameField: 'gmail'
}, async (gmail, password, done) => {
  // Match Email's User
  const admi = await Admi.findOne({gmail: gmail});
  if (!admi) {
    return done(null, false, { message: 'pagina no encontrada.' });
  } else {
    // Match Password's User
    const match = await admi.matchPassword(password);
    if(match) {
      return done(null, admi);
    } else {
      return done(null, false, { message: 'contaceña incorrecta.' });
    }
  }

}));

passport.serializeUser((admi, done) => {
  done(null, admi.id);
});

passport.deserializeUser((id, done) => {
  Admi.findById(id, (err, admi) => {
    done(err, admi);
  });
});
