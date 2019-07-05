const express = require('express');
const router = express.Router();
const Book  = require('../models/book')



router.route('/:id')
    .get(function(req, res){
      Book.findById(req.params.id, (err, book) => {
        if (err) res.send(err)

          res.json(book)
      })
    })
    .delete(function(req, res){
      Book.remove({_id: req.params.id}, (err, result) => {
        res.json({ message: "Book was deleted", result})
      })
    })
    .put(function(req, res){
      Book.findById({_id: req.params.id}, (err, book) => {
        if(err) res.send(err)


        Object.assign(book, req.body).save((err, book) => {
          if(err) res.send(err)

            res.json({message: "book updated!", book})
        })
      })
    })















/* GET home page. */
router.route('/')
    .get(function(req, res){

      const query = Book.find();

      query.exec((err, books) => {
        if (err) res.send(err)

          res.json(books)
      })
    })
    .post(function(req, res){

      const newBook = new Book(req.body);

      newBook.save((err, book) => {
        if(err){
          res.send(err)
        }
        else {
          res.json({message: "Book successfully added", book})
        }
      })



    })


module.exports = router;
