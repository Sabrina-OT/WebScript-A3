var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'My Work Tracker'});
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { 
    title: 'My Work Tracker'});
});

/* GET track page. */
router.get('/tracklist', function(req, res, next) {
  res.render('../views/track/list', { 
    title: 'Tracker'});
});

module.exports = router;