var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');

var index = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/vue-app', { useUnifiedTopology: true, useNewUrlParser: true })
  .then(response => {
    console.log("COnnected DB")
  })
  .catch();

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.listen(3000, () => {
  console.log('Listening')
})