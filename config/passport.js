const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User');

// passport is going to be passed in from the server.js file
module.exports = function(passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      // Match user
      User.findOne({username: username})
        .then(user => {
          if (!user) {
            return done(null, false, {message: 'That username does not exist'});
          }

          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              console.log('done first block, error')
              return done(err)
            }
            if (isMatch) {
              console.log('done 2nd, isMatch')
              return done(null, user)
            } else {
              console.log('done 3rd, no match')
              return done(null, false, {message: 'Password incorrect'})
            }

          })
        })
        .catch(err => done(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
 
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  // passport.serializeUser()
}