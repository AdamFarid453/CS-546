const express = require('express');
const router = express.Router();
const mongoCollections = require("../config/mongoCollections");
const data = require('../data');
const reviewData = data.reviews
const bookData = data.books
const books = mongoCollections.books;
const ObjectId = require('mongodb').ObjectId

router.get('/:id', async (req, res) => {
    try {
        const bookBeingReviewed = req.params.id
        let reviewCollection = await reviewData.getAll();
        var result = reviewCollection.filter(function( obj ) {
            return obj.bookBeingReviewed === bookBeingReviewed;
        });
        res.status(200).json(result);
    } catch (error) {
        console.log(error) // logging the error just in case (for debug purposes)
        res.status(404).send();//json({ message: `Post with id of ${req.params.id} not found` }
    }
  });
//title, reviewer, bookBeingReviewed, rating, dateOfReview, review
  router.post('/:id', async (req, res) => {
    
    // const booksPostData = req.body
    const title = req.body.title
	const reviewer = req.body.reviewer;
    const bookBeingReviewed = req.body.bookBeingReviewed;
    const rating = req.body.rating
	const dateOfReview = req.body.dateOfReview;
    const review = req.body.review;
    try {
        await bookData.get(req.params.id);
    } catch (e) {
        console.log(e)
      res.status(404).json({ error: 'No book exists' });
      return;
    }
    try{
    let result = await reviewData.create(title, reviewer, bookBeingReviewed, rating, dateOfReview, review)
    let book = await bookData.get(req.params.id)
    let answer = book.reviews.push(result._id)
    let parsedId = ObjectId(req.params.id);
    const bookCollection = await books();
    bookCollection.updateOne(
        { _id : parsedId}, 
        {$set: {'reviews': book.reviews}}
    )
    res.status(200).json(result);
	} catch(error){
        console.log(error)
    	res.status(404).json({ error: error });
    };
});

router.get('/:id/:id', async (req, res) => {
    try {
        const reviewID = req.params.id
        try {
            let result = await reviewData.get(reviewID);
            res.status(200).json(result);
        } catch (e) {
            console.log(e)
          res.status(404).json({ error: 'No book exists' });
          return;
        }
    } catch (error) {
        console.log(error) // logging the error just in case (for debug purposes)
        res.status(404).send();//json({ message: `Post with id of ${req.params.id} not found` }
    }
  });

  router.delete('/:id/:id', async (req, res) => {
    if (!req.params.id) {
      res.status(400).json({ error: 'You must Supply and ID to delete' });
      return;
    }
    try {
      await reviewData.get(req.params.id);
    } catch (e) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    try {
        let review = await reviewData.get(req.params.id)
        const gotBook = await bookData.get(review.bookBeingReviewed)
        await bookData.updateBook(gotBook._id.toString(), gotBook.title, gotBook.author, gotBook.genre, gotBook.datePublished, gotBook.summary, gotBook.reviews.filter((x) => x != req.params.id))
        await reviewData.remove(req.params.id);
        var result = {
            "reviewId": req.params.id,
            "deleted": true
        }

      res.status(200).json(result);
    } catch (e) {
        console.log(e)
      res.status(500).json({ error: e });
    }
  });

module.exports = router;