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
   

    var responder = function(isFound){
      console.log('-------------->' +isFound);
      if(isFound){
        fs.readFile(archive.paths.archivedSites + '/' + query.url + ".txt", function(err, data){
          if(err){
            throw err;
          }
          console.log('yay')
          // var contentType = {
          //   'Content-Type': 'text/plain' //mime.lookup(pathToLoad)
          // }
          //console.log(response)
          helper.sendResponse(response, data.toString(), 200);
        });
      } else {
        // save the url in site.txt for later fetching

        // redirect user to waiting page (loading.html)
        archive.addUrlToList(query.url);
        //console.log('JHSAGHJSCGFHJGJHSDGJHGHJGJHCGJH')
        
        var newLocation = { 
          'Location': '/loading.html' //mime.lookup(pathToLoad)
        }
        helper.sendResponse(response, null, 302, newLocation);
      }
    }

    archive.isUrlArchived(query.url, responder)    
  },
  'OPTIONS': function(request, response){
    helper.sendResponse(response, null);
  }
}

exports.handleRequest = function (req, res) {
    
  var action = actions[req.method]
  action(req, res)
};
 