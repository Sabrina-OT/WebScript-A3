var express = require('express');
var router = express.Router();
let Book = require('../models/bio_books');

module.exports.displayBooklist = async (req, res, next) => {
    try{
        const BookList = await Book.find();
        res.render('book/list', {
            title: "Book List",
            BookList: BookList
        });
    }
    catch(err){
        console.error(err);
        res.render('book/list', {
            error:'error on server'
        });
    }
};


module.exports.AddBook = (req, res, next) => {
    try{
        res.render('book/add',
        {
            title: 'Add Book'
        })
    }
    catch(err){
        console.error(err);
        res.render('book/list', {
            error:'error on server'
        });
    }
};

module.exports.ProcessBook = (req, res, next) => {
    try{
        let newBook = Book({
            "Name": req.body.Name,
            "Author": req.body.Author,
            "Published": req.body.Published,
            "Description": req.body.Description,
            "Price": req.body.Price
        });
        Book.create(newBook).then(() => {
            res.redirect('/bookslist')
        })
    }

    catch(err){
        console.error(err);
        res.render('book/list', {
            error:'error on server'
        });
    }
};

module.exports.EditBook = async (req, res, next) => {
    try{
        const id = req.params.id;
        const bootToEdit = await Book.findById(id);
        res.render('book/edit',
        {
            title: 'Edit Book',
            Book: bootToEdit
        })
    }
    catch(err){
        console.error(err);
        res.render('book/list', {
            error:'error on server'
        });
    }
    
};

module.exports.ProcessEditBook = (req, res, next) => {
    try{
        const id = req.params.id;
        let updatedBook = Book({
            "_id": id,
            "Name": req.body.Name,
            "Author": req.body.Author,
            "Published": req.body.Published,
            "Description": req.body.Description,
            "Price": req.body.Price
        })
        Book.findByIdAndUpdate(id, updatedBook).then(() =>{
            res.redirect('/bookslist')
        });
    }
    catch(err){
        console.error(err);
        res.render('book/list', {
            error:'error on server'
        });
    }
};

module.exports.DeleteBook = async (req, res, next) => {
    try{
        let id = req.params.id;
        Book.deleteOne({_id:id}).then(() =>
        {
            res.redirect('/bookslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('book/list', {
            error:'error on server'
        });
    }
};
