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
    })
  });
  
  





  // var archivedUrls = _.map(archive.readUrlArchived(), function(el){
  //   return el.replace('.txt', '');
  // });
  // return _.difference(urls, archivedUrls);
};
//websiteToFetch();
var fetchWebsite = function(url){
  var websiteContent = '';

  var handler = function(response) {

    response.on('data', function (chunk) {
      websiteContent += chunk;
    });

    response.on('end', function () {
      console.log(websiteContent);
    });
  }
  
  http.request(url, handler).end();

  return websiteContent
}


// _.each(websiteToFetch(), function(url){
//   var website = fetchWebsite(url);
//   archives.downloadUrls(url, website);
// })


