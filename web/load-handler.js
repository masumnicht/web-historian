var archive = require('../helpers/archive-helpers');
var helper  = require('./http-helpers');
var url     = require("url");
var fs      = require("fs");

var actions = {
  'GET': function(request, response){
    var parsedUrl = url.parse(request.url).pathname;
    
    if( parsedUrl === '/' ){
      parsedUrl = '/index.html';
    }
    var pathToLoad = __dirname + '/public' + parsedUrl;

    helper.serveAssets(response, pathToLoad);
  },
  'OPTIONS': function(request, response){
    helper.sendResponse(response, null);
  }
};

exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  action(req, res);
};
