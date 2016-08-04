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


//links all of the page routing
require('./routing/html-routes.js')(app, request, cheerio, db, mongojs);

// set app to run at port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});

// MONGODB_URI: mongodb://heroku_22nhrv8q:ais7q1h1s8ug0i9jp9pv352auu@ds035004.mlab.com:35004/heroku_22nhrv8q