var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { default: mongoose } = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var expressLayouts = require("express-ejs-layouts");
var session = require('express-session')
var sessionAuth = require('./middlewares/sessionAuth');
var userRouter = require('./routes/users');
var app = express();
app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 }
}))




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(sessionAuth)
app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.use('/', indexRouter);

app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
mongoose.connect("mongodb+srv://sufiyanchishty71:VW9PNfenilMmyFDI@cluster0.8o4qmmp.mongodb.net/Product").then(()=>console.log("connected")).catch((error)=>console.log(error.message));

module.exports = app;
