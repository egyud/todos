const express = require('express');
const router = express.Router();

// const Todo = require('../models/Todo');
const User = require('../models/User');

let isLoggedIn = false;

router.get('/register', (req, res) => {
  if (req.user !== undefined) {
    isLoggedIn = true;
  }
  res.render('register', {
    pageTitle: 'Register',
    loggedIn: isLoggedIn
  });
})

router.get('/login', (req, res) => {
  console.log(req.user);
  if (req.user !== undefined) {
    isLoggedIn = true;
  }
  res.render('login', {
    pageTitle: 'Login',
    errors: {},
    loggedIn: isLoggedIn,
    flashMsg: req.flash('success')
  })
})

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/login');
})

router.get('/deleteTodo/:id', (req, res) => {
  console.log('delete')
  console.log(req.params);
  User.updateOne({username: req.user.username}, {$pull: {todos: {_id: req.params.id}}})
    .then(user => {
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

router.get('/', (req, res) => {
  // let isLoggedIn = false;
  console.log(req.user);
  if (req.user !== undefined) {
    let isLoggedIn = true;
    User.findOne({username: req.user.username})
      .then(user => {
        let todos = user.todos;
        res.render('todoList', {
          todos: todos,
          pageTitle: 'Home',
          loggedIn: isLoggedIn,
          username: user.username,
          flashMsg: req.flash('successFlash')
        })
      })
  } else {
    res.render('index', {
      pageTitle: 'Home',
      todos: [],
      loggedIn: isLoggedIn,
      username: null,
      flashMsg: req.flash('successFlash')
    })
  }

  // Todo.find({})
  //   .then(todos => {
  //     console.log('getting todos', todos)
  //     res.render('index', {
  //       todos: todos,
  //       pageTitle: 'Home',
  //       isLoggedIn: isLoggedIn
  //     })
  //   })
  //   .catch(err => console.log(err))
})

module.exports = router;