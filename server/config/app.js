/* installed 3rd party packages */
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

/* creating an application */
let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views')); //if looking for views, go into the folder 'views
app.set('view engine', 'ejs'); //using view engine ejs

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//NEW UPDATES 2023-11-06 -----------------------------
let mongoose = require('mongoose');
let mongoDB = mongoose.connection;
let DB = require('./db');
// mongoose.connect('mongodb://127.0.0.1:27017/WorkTracker');
mongoose.connect(DB.URI);
mongoDB.on('error', console.error.bind(console, 'Connection Error'));
mongoDB.once('open', ()=>{console.log("MongoDB is connected")});
//mongoose.connect(DB.URI);
// ----------------------------------------------------

/* related to the routers */
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let TrackerRouter = require('../routes/Tracker');

app.use('/', indexRouter); //localhost:5000
app.use('/users', usersRouter);//localhost:5000/users
app.use('/tracklist', TrackerRouter);

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
  res.render('error', 
  {
    title: "Error"
  });
});

module.exports = app;
