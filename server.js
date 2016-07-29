// Dependencies
var express = require('express');// 1: Intialize Express
var app = express();
var request = require('request'); // Snatches html from urls
var cheerio = require('cheerio'); // Scrapes our html
var bodyParser = require('body-parser');

// makes static content in assets accessible
app.use(express.static(process.cwd() + '/app'));	

// BodyParser interprets data sent to the server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

//Database configuration
var mongojs = require('mongojs');
var databaseUrl = "OrlandoNews";
var collections = ["article"];

// use mongojs to hook the database to the db variable 
var db = mongojs(databaseUrl, collections);

// this makes sure that any errors are logged if mongodb runs into an issue
db.on('error', function(err) {
  console.log('Database Error:', err);
});

//setting up handlebars
var exphbs = require('express-handlebars');
var hbs = require('handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Make a request call to grab the html body from the site of your choice
request('http://www.orlandoweekly.com/blogs/Blogs/', function (error, response, html) {

// Load the html into cheerio and save it to a var.
  var $ = cheerio.load(html);

  // an empty array to save the data that we'll scrape
  var result = [];

  //the title and link scrapped from Orlando News
  $('h3.postTitle').each(function(i, element){
      var title = $(this).text();
      var link = $(this).find('a').attr('href');

      result.push({
        Title: title,
        Link: link
      });
    });

  //the body summary from Orlando News
  $('.postBody').each(function(i, element){
      var textSumm = $(this).text();
      var link = $(this).find('.postSummary')

      result.push({
        body: textSumm    
      });
   	});
  
  console.log(result);

});

require('./routing/html-routes.js')(app);

// set app to run at port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});