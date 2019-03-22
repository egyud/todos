const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');
const ValidateRegisterInput = require('../validation/register');
const ValidateLoginInput = require('../validation/login');

router.post('/register', (req, res) => {
  const { errors, isValid } = ValidateRegisterInput(req.body);
  if (!isValid) {
    // return res.status(400).json(errors);
    console.log(errors);
    return res.render('register', {errors: errors})
  }

  const { username, email, password } = req.body;
  User.findOne({username: username})
    .then(user => {
      if (user) {
        console.log('user was found');
        console.log(user)
        return res.render('register', {errors: errors})
        // return res.status(400).json({email: "Email Address Already in Use"});
      } else {
        console.log('user was not found.  creating new uer')
        const newUser = new User({
          username,
          email,
          password
        })
      
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              console.log(err);
              return res.status(400);
            } 
            newUser.password = hash;
            newUser.save()
              .then(user => {
                console.log(user);
                console.log(req.body)
                req.flash('success', 'You are now registered and can log in');
                return res.redirect('/login');
              })
          }) 
        })
      }
    })
    
})

router.post('/login', (req, res, next) => {
  const { errors, isValid } = ValidateLoginInput(req.body);

  if (!isValid) {
    //will only go in this block if username or password field is blank
    console.log(errors);
    return res.render('login', {
      errors: errors
    })
  } else {
    // 
    console.log('no error');
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      successFlash: 'You are now logged in',
      failureFlash: 'Invalid username or password'
    })(req, res, next);
  }
  

})

module.exports = router;