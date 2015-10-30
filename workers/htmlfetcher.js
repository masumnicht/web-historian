var http    = require('http');
var archive = require('../helpers/archive-helpers.js');
var _       = require("underscore");

exports.websiteToFetch = function(){
  archive.readListOfUrls(function(urls){
    archive.readUrlArchived(function(files){
      var urlToFetch = _.difference(urls, files);
      _.each(urlToFetch, function(url){
        if(url !== ''){
          fetchWebsite(url);
        }
      });
    });
  });
};

var fetchWebsite = function(url){
  var options = {
    host: url,
    path: '/'
  };

  var websiteContent = '';

  var handler = function(response) {

    response.on('data', function (chunk) {
      websiteContent += chunk;
    });

    response.on('end', function () {
      var headIndex = websiteContent.indexOf('<head>')+6;

      websiteContent =  websiteContent.slice(0,headIndex) + 
                        '<base href="http://'+url+'"><link rel="icon" href="data:;base64,=">' + 
                        websiteContent.slice(headIndex)

      archive.downloadUrls(url, websiteContent);
    });
  }
  http.get(options, handler).end();
};

