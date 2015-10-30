var archive = require('../helpers/archive-helpers');
var helper  = require('./http-helpers');
var _       = require("underscore");
var url     = require("url");
var qs      = require("query-string");
var fs      = require("fs");

var actions = {
  'GET': function(request, response){
    var query = qs.parse(url.parse(request.url).query);
   
    var responder = function(isFound){
      if(isFound){
        fs.readFile(archive.paths.archivedSites + '/' + query.url + ".txt", function(err, data){
          if(err){
            throw err;
          }
          helper.sendResponse(response, data.toString(), 200);
        });
      } else {

        archive.addUrlToList(query.url);
        
        var newLocation = { 
          'Location': '/loading.html'
        };
        helper.sendResponse(response, null, 302, newLocation);
      }
    };
    archive.isUrlArchived(query.url, responder)    
  },

  'OPTIONS': function(request, response){
    helper.sendResponse(response, null);
  }
}

exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  action(req, res);
};
 