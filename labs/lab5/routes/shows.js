const express = require('express');
const router = express.Router();
const axios = require('axios');


async function getShows(){
    const {data} = await axios.get("http://api.tvmaze.com/shows")
    return data
  }

//ask if http://localhost:3000/shows/33.0 will be tested

async function getShowbyID(id){
    const shows = await getShows()
    var isInt = /^\+?\d+$/.test(id); //regex to test if the number inputted is a positive whole number
    if(!isInt) throw "ID is not a positive integer"
    let obj = shows.find(obj => obj.id == id);
    if(!obj) throw "No object with that ID"
    return obj
}


router.get('/', async (req, res) => {
    try{
        const shows = await getShows()
        res.json(shows)
    }catch(e){
        res.status(500).send();
    }
});

/***************ID WILL BE THE PARAMETER HERE******************* */
router.get('/:id', async (req, res) => {
    try {
      let post = await getShowbyID(req.params.id); //providing parameter for the specific id the user wants to see
      res.json(post);
    } catch (error) {
        console.log(error) // logging the error just in case (for debug purposes)
        res.status(404).json({ message: `Post with id of ${req.params.id} not found` });
    }
  });


module.exports = router;