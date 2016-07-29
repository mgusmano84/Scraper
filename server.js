// Dependencies
// 1: Intialize Express
var express = require('express');
var app = express();
var request = require('request'); // Snatches html from urls
var cheerio = require('cheerio'); // Scrapes our html

// 2. Database configuration
// require mongojs, then save the url of our database 
// as well as the name of our collection
var mongojs = require('mongojs');
var databaseUrl = "";
var collections = [""];

// use mongojs to hook the database to the db variable 
var db = mongojs(databaseUrl, collections);

// this makes sure that any errors are logged if mongodb runs into an issue
db.on('error', function(err) {
  console.log('Database Error:', err);
});


// Make a request call to grab the html body from the site of your choice
request('http://www.orlandoweekly.com/blogs/Blogs/', function (error, response, html) {

// Load the html into cheerio and save it to a var.
  var $ = cheerio.load(html);

  // an empty array to save the data that we'll scrape
  var result = [];

  //the link i'm trying to scrap from
  $('h3.postTitle').each(function(i, element){
      var title = $(this).text();
      var link = $(this).find('a').attr('href');

      result.push({
        awesomeTitle: title,
        amazingLink: link
      });



    // Scrape information from the web page, put it in an object 
    // and add it to the result array. 

    });

  	   $('.postBody').each(function(i, element){
      var textSumm = $(this).text();
      var link = $(this).find('.postSummary')

      result.push({
        body: textSumm
        
      });
     });
  console.log(result);
});




// set app to run at port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});