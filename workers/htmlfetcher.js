var http = require('http');
var archive = require('../helpers/archive-helpers.js');
var _ = require("underscore");



exports.websiteToFetch = function(){
  archive.readListOfUrls(function(urls){
    console.log('here', urls)
    archive.readUrlArchived(function(files){
      //console.log(urls);
      var urlToFetch = _.difference(urls, files);
      console.log(urlToFetch);
      _.each(urlToFetch, function(url){
        if(url !== ''){
          fetchWebsite(url);
        }
      })
    })
  });
  
  





  // var archivedUrls = _.map(archive.readUrlArchived(), function(el){
  //   return el.replace('.txt', '');
  // });
  // return _.difference(urls, archivedUrls);
};
//websiteToFetch();
var fetchWebsite = function(url){
  var options = {
    host: url,
    path: '/'
  }

  var websiteContent = '';

  var handler = function(response) {

    response.on('data', function (chunk) {
      websiteContent += chunk;
    });

    response.on('end', function () {
      //console.log(websiteContent);

      var headIndex = websiteContent.indexOf('<head>')+6;
      websiteContent = websiteContent.slice(0,headIndex) + 
            '<base href="http://www.amazon.com/"><link rel="icon" href="data:;base64,=">' + 
            websiteContent.slice(headIndex)
      //console.log(websiteContent)

      archive.downloadUrls(url, websiteContent);
    });
  }
  
  http.get(options, handler).end();

  //return websiteContent
}

// return http.get({
//         host: 'personatestuser.org',
//         path: '/email'
//     }, function(response) {
//         // Continuously update stream with data
//         var body = '';
//         response.on('data', function(d) {
//             body += d;
//         });
//         response.on('end', function() {

//             // Data reception is done, do whatever with it!
//             var parsed = JSON.parse(body);
//             callback({
//                 email: parsed.email,
//                 password: parsed.pass
//             });
//         });
//     });



// _.each(exports.websiteToFetch(), function(url){
//   var website = fetchWebsite(url);
//   archives.downloadUrls(url, website);
// })


