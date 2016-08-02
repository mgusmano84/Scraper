module.exports = function(app, request, cheerio, db) {


    app.get('/', function(req, res) {

      res.render('home', {})
               
    });

   
    app.get('/info', function(req, res) {
  
	request('http://www.orlandoweekly.com/blogs/Blogs/', function (error, response, html) {

    var $ = cheerio.load(html);
  

	  //the title and link scrapped from Orlando News
	    $('h3.postTitle').each(function(i, element){
	      var title = $(this).text();
	      var link = $(this).find('a').attr('href');

        var result = {
          awesomeTitle: title,
          amazingLink: link
        };

           db.article.insert(result, function (err, docs) {
    	           if (err) {
                        console.log(err);
                  } else {
                      console.log(docs);
                  }
            });
      });
      res.send("worked");
  });
});


// // Make a request call to grab the html body from the site of your choice
// request('http://www.orlandoweekly.com/blogs/Blogs/', function (error, response, html) {

// // Load the html into cheerio and save it to a var.
//   var $ = cheerio.load(html);

//   // an empty array to save the data that we'll scrape
//   var result = [];

//   //the title and link scrapped from Orlando News
//   $('h3.postTitle').each(function(i, element){
//       var title = $(this).text();
//       var link = $(this).find('a').attr('href');

//       result.push({
//         Title: title,
//         Link: link
//       });
//     });

//   //the body summary from Orlando News
//   $('.postBody').each(function(i, element){
//       var textSumm = $(this).text();
//       var link = $(this).find('.postSummary')

//       result.push({
//         body: textSumm    
//       });
//    	});
  
//   console.log(result);

// });







};