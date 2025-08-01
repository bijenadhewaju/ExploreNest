require('dotenv').config(); 

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require("./routes/admin.js");
var activitiesRouter = require("./routes/activities.js");
// var signinRouter=require("./routes/signin.js");
var trekRoutes = require("./routes/treks.js");

//add your own MongoDB connection string
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.yzxirzy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=> console.log("Connected"))
.catch((err)=> console.error("Error connecting",err))
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);
app.use('/activities',activitiesRouter);
// app.use('/signin',signinRouter);
app.use('/trek', trekRoutes);


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

module.exports = app;