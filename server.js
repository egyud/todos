const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require("connect-flash");
const session = require("express-session");
const db = require('./config/keys').mongoURI;

const app = express();

const todoRoutes = require('./routes/todos');
const userRoutes = require('./routes/users');
const homeRoutes = require('./routes/home');

// Passport config
require('./config/passport')(passport);

//configrue bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Express Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false
}));

//configure passport
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('sucess_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

//configure views
app.set('view engine', 'ejs');

app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);
app.use('/', homeRoutes);


mongoose.connect(db, {useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

//declare PORT and set server to listen
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));