var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers');
var _ = require("underscore");
var url = require("url");
var qs = require("query-string");
var fs = require("fs");

var actions = {
  'GET': function(request, response){
    var query = qs.parse(url.parse(request.url).query);
    console.log('hey')
   

    var responder = function(){
      console.log(archive.paths.archivedSites + '/' + query.url + ".txt")
      fs.readFile(archive.paths.archivedSites + '/' + query.url + ".txt", function(err, data){
        if(err){
          throw err;
        }
        console.log('yay')
        var contentType = {
        'Content-Type': 'text/plain' //mime.lookup(pathToLoad)
        }
        //console.log(response)
        helper.sendResponse(response, data, 200, contentType);
      });
    }

    archive.isUrlArchived(query.url, responder)    

    // if(archive.isUrlArchived(query.url, callback)){
    //   fs.readFile(archives.paths.archivedSites + '/' + query + ".txt", function(err, data){
    //     if(err){
    //       throw err;
    //     }
    //     var contentType = {
    //     'Content-Type': mime.lookup(pathToLoad)
    //     }
    //     //console.log(response)
    //     helper.sendResponse(response, data, 200, contentType);
    //   });
    // } else {
  },
  'OPTIONS': function(request, response){
    helper.sendResponse(response, null);
  }
}

exports.handleRequest = function (req, res) {
    
  var action = actions[req.method]
  action(req, res)
};
 