var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// our db model
var Animal = require("../models/model.js");

// TWITTER SETUP //
// You must create an app as a developer here: https://apps.twitter.com/
var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});



// home route
router.get('/', function(req, res) {
  
  var jsonData = {
  	'name': 'node-express-api-boilerplate',
  	'api-status':'OK'
  }

  res.render('index.html')
});

router.get('/api/get/twitter/:user', function(req,res){

  var requestedScreeName = req.params.user;

  console.log(requestedScreeName);

  client.get('statuses/user_timeline', {screen_name: requestedScreeName}, function(error, tweets, response){
    if (!error) {
      console.log(tweets);
    }

    console.log(tweets);

    res.json(tweets);
  });  

})

module.exports = router;