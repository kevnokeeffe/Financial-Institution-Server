var createError = require('http-errors');
var express = require('express');
const mongoose = require('./db/mongoose')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
var indexRouter = require('./routes/index');
let testRouter = require('./routes/test');
let accountRouter = require('./routes/account-routes');
let userRouter = require('./routes/user-routes')
let fiController = require('./controllers/financial-institution/financial-institution-controller')
require('dotenv').config()
var app = express();
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/test', testRouter);
app.use('/api/account', accountRouter);
app.use('/api/user', userRouter);
app.use('/api/fi/create', fiController.createFi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// function ignoreFavicon(req, res, next) {
//   if (req.originalUrl === '/favicon.ico') {
//     res.status(204).json({nope: true});
//   } else {
//     next();
//   }
// }
// app.use(ignoreFavicon);

app.use( function(req, res, next) {

  if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    return res.sendStatus(204);
  }

  return next();

});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
