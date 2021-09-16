const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        let obj = {
            "name": "Adam Farid",
            "cwid": "10439232",
            "biography": "I was born in the US and raised up in Morocco as a kid.\n I would grow up to enjoy programming and building computers and eventually enroll in SIT.",
            "favoriteShows": ["Dark", "Avatar the Last Airbender", "SpongeBob", "Attack on Titan"]
        }
        res.json(obj)
    }catch(e){
        res.status(500).send();
    }
});



module.exports = router;
