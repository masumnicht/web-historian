var _ = require("underscore");

var actions = {
  'GET': function(request, response){

  },
  'OPTIONS': function(request, response){

  }
}

exports.handleRequest = function (req, res) {
    
  var action = actions[req.method]
  action(req, res)
};
