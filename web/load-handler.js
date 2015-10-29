//var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers');
var url = require("url");
// var _ = require("underscore");
var fs = require("fs");
//var mime = require("mime");


// var sendResponse = function(response, data, statusCode, customHeader){
//   statusCode = statusCode || 200;
//   //customHeader = customHeader || {};
//   headers = customHeader ? 
//               _.extend({}, helper.headers, customHeader) :
//               helper.headers
//   console.log(headers)
//   response.writeHead(statusCode, headers);
//   //console.log(response);
//   response.end(data);
// }

var actions = {
  'GET': function(request, response){
    var parsedUrl = url.parse(request.url).pathname;
    console.log(parsedUrl)
    if( parsedUrl === '/' ){
      parsedUrl = '/index.html';
    }
    console.log(__dirname)
    var pathToLoad = __dirname + '/public' + parsedUrl;
    helper.serveAssets(response, pathToLoad);
    // console.log(pathToLoad);
    // fs.readFile(pathToLoad, function (error, file){
    //   if( error ){
    //     throw error;
    //   }
    //   var contentType = {
    //     'Content-Type': mime.lookup(pathToLoad)
    //   }
    //   //console.log(response)
    //   helper.sendResponse(response, file, 200, contentType);
    //});
  },
  'OPTIONS': function(request, response){
    helper.sendResponse(response, null);
  }
};

exports.handleRequest = function (req, res) {
  var action = actions[req.method]
  //console.log(req.method)
  action(req, res)
};

