const express = require('express');
const router = express.Router();

// const Todo = require('../models/Todo');
const User = require('../models/User');

router.post('/', (req, res) => {
  const { content } = req.body;

  // const newTodo = new Todo({
  //   content: content
  // })

  User.updateOne({username: req.user.username}, {$push: {todos: {content: content}}})
    .then(user => {
      console.log(user);
      res.redirect('/');
    })
    .catch(err => console.log(err));
  // newTodo.save()
  //   .then(todo => {
  //     console.log('req body', req.body)
  //     console.log(todo);
  //     console.log('saving todo');
  //     res.redirect('/');
  //   })
  //   .catch(err => console.log(err))
})

module.exports = router;