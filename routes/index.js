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

// PINTEREST SETUP //
var pinterestAPI = require('pinterest-api');
 
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
    console.log(tweets);
    res.json(tweets);
  });  

})

router.get('/api/get/pinterest/boards/:account', function(req,res){

  var requestedAccount = req.params.account;

  // Create a new object and set the accountname 
  var pinterest = pinterestAPI(requestedAccount);


  // Get all boards for the above account name 
  pinterest.getBoards(true, function (boards) {
    console.log(boards);
    res.json(boards);      
  }); 

})

router.get('/api/get/pinterest/pins/:account', function(req,res){

  var requestedAccount = req.params.account;

  // Create a new object and set the accountname 
  var pinterest = pinterestAPI(requestedAccount);


  // Get all boards for the above account name 
  pinterest.getPins(function (pins) {
    console.log(pins);
    res.json(pins);      
  }); 

})

router.get('/api/get/pinterest/account', function(req,res){

  var requestedAccount = req.params.account;

  // Create a new object and set the accountname 
  var pinterest = pinterestAPI(requestedAccount);


  // Get all boards for the above account name 
  pinterest.getBoards(true, function (boards) {
    console.log(boards);
    res.json(boards);      
  }); 

})

router.get('/api/get/pinterest/pins/:account/board/:board', function(req,res){

  var requestedAccount = req.params.account;
  var requestedBoard = req.params.board;

  // Create a new object and set the accountname 
  var pinterest = pinterestAPI(requestedAccount);


  // Get pins from a board (second parameter determines whether you want the results paginated and to include some metadata) 
  pinterest.getPinsFromBoard(requestedBoard, true, function (pins) {
    console.log(pins);
    res.json(pins);
  });

})

module.exports = router;