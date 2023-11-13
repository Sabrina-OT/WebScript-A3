// CRUD --> CREATE, READ, UPDATE, DELETE
var express = require('express');
var router = express.Router();
let Book = require('../models/bio_books');
let BookController = require('../controllers/bio_books')

// READ OPERATION ----------------------------------------------------
// get route for the bio books list
// if you get something, put it in the booklist
router.get('/', BookController.displayBooklist); 

// CREATE OPERATION ----------------------------------------------------
// get route for Add Book page 
router.get('/add', BookController.AddBook);

// post route for Add Book page
router.post('/add', BookController.ProcessBook);

// UPDATE OPERATION ----------------------------------------------------
// get route for displaying the Edit Book page 
router.get('/edit/:id', BookController.EditBook);

// post route for processing the Edit Book page
router.post('/edit/:id', BookController.ProcessEditBook);

//DELETE OPERATION ----------------------------------------------------
// get to perform delete operation
router.get('/delete/:id', BookController.DeleteBook);

module.exports = router;