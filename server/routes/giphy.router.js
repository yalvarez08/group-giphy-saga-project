const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios')

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.query);
    axios
    //search endpoints and pass the search term and limit the results.
    .get("https://api.giphy.com/v1/gifs/search?api_key="+process.env.GIPHY_API_KEY +"&q="+req.query.q+"&limit=10")
    .then(function (response) {
        // console.log(response.data);
        //only extracting url and title
        const data = response.data
       const allDetails = data.data.map((gif)=>(
        {
            url:gif.images.original.webp,
            title:gif.title
        }
       ))
       
        res.send(allDetails)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500);
    });
  });



module.exports = router;