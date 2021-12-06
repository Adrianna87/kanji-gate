const express = require("express")
const axios = require("axios");
const dotenv = require('dotenv');
dotenv.config();
const router = new express.Router();

const options = {
  method: 'GET',
  url: 'https://kanjialive-api.p.rapidapi.com/api/public/kanji/all',
  headers: {
    'x-rapidapi-host': 'kanjialive-api.p.rapidapi.com',
    'x-rapidapi-key': `${process.env.API_KEY}`
  }
};

router.get('/', (req, res) => {
  console.log('test');
  axios.request(options)
    .then((response) => {
      res.json(response.data);
    }).catch(function (error) {
      console.error(error);
    });
});

module.exports = router;