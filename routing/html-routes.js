module.exports = function(app, request, cheerio, db) {


	//This will get the homepage upon start up of the website
    app.get('/', function(req, res) {

      	db.article.find({}, function(err, data) {
		if (err) throw err;
		res.render("home", {article: data});
		})
               
    });

   
    app.get('/info', function(req, res) {
  
	request('http://www.orlandoweekly.com/blogs/Blogs/', function (error, response, html) {

    var $ = cheerio.load(html);
  

	  //the title and link scrapped from Orlando News
	    $('.blogPost').each(function(i, element){

	      var result = {};

	      //this will insert the article title
	      var title = $(this).find('h3.postTitle').text();
	      //this will insert the article title
	      var link = $(this).find('h3.postTitle').find('a').attr('href');
		  //this will insert the article title
	      var summ = $(this).find('.postSummary').text();
	      //this will insert the article title
	      var photo = $(this).find('.storyTeaser').find('img').attr('src');


	      //if there the title is not empty or blank
	      if (title !== '') {
          
          result.Title= title;
          result.Link= link;
          result.Summary = summ;
          result.Photo= photo;
          result.Comment = [];

          //this will save the pulled data in the article collection
          db.article.save(result, function (err, docs) {
    	           if (err) {
                        console.log(err);
                  } else {
                      console.log(docs);
                  }
            });
         }
      });
      res.send("worked");

  	});
	});

	app.get('/show', function(req, res) {

		db.article.find({}, function (err, docs) {
	  	if (err) throw err;
	  	res.send(docs)
		
		});
	});




};