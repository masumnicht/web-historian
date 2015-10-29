var http = require('http');
var archive = require('../web/archive-helpers')


var websiteToFetch = function(){
  var urls = archive.readListOfUrls();
  var archivedUrls = _.map(archive.readUrlArchived(), function(el){
    return el.replace('.txt', '');
  });
  return _.difference(urls, archivedUrls);
};

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


_.each(websiteToFetch(), function(url){
  var website = fetchWebsite(url);
  archives.downloadUrls(url, website);
})