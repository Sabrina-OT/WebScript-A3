// CRUD --> CREATE, READ, UPDATE, DELETE
var express = require('express');
var router = express.Router();
let Task = require('../models/Tracker');
let TaskController = require('../controllers/Tracker')

// READ OPERATION ----------------------------------------------------
// get route for the bio books list
// if you get something, put it in the booklist
router.get('/', TaskController.displayTasklist); 

// CREATE OPERATION ----------------------------------------------------
// get route for Add Book page 
router.get('/add', TaskController.AddTask);

// post route for Add Book page
router.post('/add', TaskController.ProcessTask);

// UPDATE OPERATION ----------------------------------------------------
// get route for displaying the Edit Book page 
router.get('/edit/:id', TaskController.EditTask);

// post route for processing the Edit Book page
router.post('/edit/:id', TaskController.ProcessEditTask);

//DELETE OPERATION ----------------------------------------------------
// get to perform delete operation
router.get('/delete/:id', TaskController.DeleteTask);

module.exports = router;