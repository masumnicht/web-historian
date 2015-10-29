var http = require("http");
var loader = require("./load-handler");
var query = require("./query-handler");
var fetcher = require("../workers/htmlfetcher.js")
var initialize = require("./initialize.js");
var url = require("url");
var cron = require('cron');

initialize("./archives");

var routes = {
  '/': loader.handleRequest,
  'query': query.handleRequest
}


var cronJob = cron.job("*/5 * * * * *", function(){
    // perform operation e.g. GET request http.get() etc.
    fetcher.websiteToFetch()
}); 
cronJob.start();


var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(function(req, resp){
  var parsedUrl = url.parse(req.url);
  var route = routes[parsedUrl.pathname];

  if( parsedUrl.query) {
    route = routes['query'];
  }
  if( route ){
    route(req, resp);
  } else {
    // 404, for the time being we call the same handler
    loader.handleRequest(req, resp);
  } 

});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}

 