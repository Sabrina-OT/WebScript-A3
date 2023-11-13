var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Home'});
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { 
    title: 'My Work Tracker'});
});

module.exports = router;

/* 
MVC --> Model View Controller 
model --> to connect our logic
view --> pages
controller --> logic behind our routes
*/