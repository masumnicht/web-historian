var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var _ = require("underscore");
var mime = require("mime");


exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.sendResponse = function(response, data, statusCode, customHeader){
  statusCode = statusCode || 200;
  //customHeader = customHeader || {};
  headers = customHeader ? 
              _.extend({}, this.headers, customHeader) :
              this.headers
  console.log(headers)
  response.writeHead(statusCode, headers);
  //console.log(response);
  response.end(data);
}

exports.serveAssets = function(response, pathToLoad, callback) {
  fs.readFile(pathToLoad, function (error, file){
    if( error ){
      throw error;
    }
    var contentType = {
      'Content-Type': mime.lookup(pathToLoad)
    }
    //console.log(response)
    exports.sendResponse(response, file, 200, contentType);  
  });
};
