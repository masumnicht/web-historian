var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var _ = require("underscore");

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

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!
