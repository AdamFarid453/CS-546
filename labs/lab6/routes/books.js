const express = require('express');
const router = express.Router();
//const axios = require('axios');
const data = require('../data');
const bookData = data.books


router.get('/', async (req, res) => {
    try{
        var allBooks = await bookData.getAll()
        let newBooks = allBooks.map(data=> {
            return {
              _id: data._id,
              'title': data['title']
            }})
            res.status(200).json(newBooks);

    }catch(e){
        res.status(500).send();
    }
});


router.post('/', async (req, res) => {
    
    // const booksPostData = req.body
    const title = req.body.title
	const author = req.body.author;
    const genre = req.body.genre;
    const datePublished = req.body.datePublished
	const summary = req.body.summary;
	const reviews = req.body.reviews;
    
    await bookData.create(title, author, genre, datePublished,summary,reviews).then((result) => {
		res.status(200).json(result);
	}).catch((error) => {
        console.log(error)
    	res.status(404).json({ error: error });
    });
});

router.get('/:id', async (req, res) => {
    try {
        let post = await bookData.get(req.params.id); //providing parameter for the specific id the user wants to see
        res.status(200).json(post);
    } catch (error) {
        console.log(error) // logging the error just in case (for debug purposes)
        res.status(404).send();//json({ message: `Post with id of ${req.params.id} not found` }
    }
  });


  router.put("/:id", async (req, res) => {
    const id = req.params.id
    const {title, author, genre, datePublished, summary, reviews} = req.body;
    const oldBook = await bookData.get(id);
    reviewCopy = [...oldBook.reviews];
    console.log("This is old reviews " +reviewCopy)
    try {
        await bookData.get(req.params.id);
    } catch (e) {
      res.status(404).json({ error: 'No book exists' });
      return;
    }
    try{
    const updatedBook = await bookData.updateBook(id, title, author, genre, datePublished, summary, reviews);
    updatedBook.reviews = reviewCopy
    res.status(200).json(updatedBook);
	} catch(error){
        console.log(error)
        res.status(404).json({ error: error });
    }});
    


//title, author, genre, datePublished, summary, reviews

    router.patch('/:id', async (req, res) => {
        const requestBody = req.body;
        let updatedObject = {};
        try {
          let oldBook = await bookData.get(req.params.id);
          if (requestBody.title && requestBody.title !== oldBook.title)
            updatedObject.title = requestBody.title;
          if (requestBody.author && requestBody.author !== oldBook.author)
            updatedObject.author = requestBody.author;
          if (requestBody.genre && requestBody.genre !== oldBook.genre)
            updatedObject.genre = requestBody.genre;
          if (requestBody.datePublished && requestBody.datePublished !== oldBook.datePublished)
            updatedObject.datePublished = requestBody.datePublished;
          if (requestBody.summary && requestBody.summary !== oldBook.summary)
            updatedObject.summary = requestBody.summary;
          if (requestBody.reviews && requestBody.reviews !== oldBook.reviews)
            updatedObject.reviews = requestBody.reviews;
        } catch (e) {
            console.log(e)
          res.status(404).json({ error: 'Post not found' });
          return;
        }
        if (Object.keys(updatedObject).length !== 0) {
          try {

            let dbBook = await bookData.get(req.params.id);
            reviewCopy = [...dbBook.reviews];
            let result = [...new Set(updatedObject.genre)];
            updatedObject.genre = result;
            let noDuplicates = [...new Set(dbBook.genre)];
            dbBook.genre = noDuplicates;
            const updatedBook = await bookData.updatePatch(
                req.params.id,
                updatedObject
              );
              updatedBook.reviews = reviewCopy
              res.status(200).json(updatedBook);
          } catch (e) {
              console.log(e)
            res.status(500).json({ error: e });
          }
        } else {
          res
            .status(400)
            .json({
              error:
                'No fields have been changed from their inital values, so no update has occurred'
            });
        }
      });

    router.delete('/:id', async (req, res) => {
        if (!req.params.id) {
          res.status(400).json({ error: 'You must Supply and ID to delete' });
          return;
        }
        try {
          await bookData.get(req.params.id);
        } catch (e) {
          res.status(404).json({ error: 'Post not found' });
          return;
        }
        try {
          await bookData.remove(req.params.id);
          var result = {
            "bookId": req.params.id,
             "deleted": true
          }
          res.status(200).json(result);
        } catch (e) {
          res.status(500).json({ error: e });
        }
      });
      
module.exports = router;