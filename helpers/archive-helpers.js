var fs   = require('fs');
var path = require('path');
var _    = require('underscore');

exports.paths = {
  siteAssets:    path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list:          path.join(__dirname, '../archives/sites.txt')
};

exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, function(err, data){
    if(err){
      throw err;
    }
    callback(data.toString().split(/\n/g));
  });
};

exports.isUrlInList = function(urlToMatch, arrayOfUrls) {
  return _.some(arrayOfUrls, function(url){
    return url === urlToMatch;
  });
};

exports.addUrlToList = function(url) {
  url = url.trim();

  exports.readListOfUrls(function(arrayOfUrls){
    var isInList = exports.isUrlInList(url, arrayOfUrls);
    if(url !== '' && !isInList){
      url = url+'\n';
      fs.appendFile(exports.paths.list, url, function (err) {
        if (err){
          throw err;
        }
        console.log('The "data to append" was appended to file!');
      });
    }
  });
};

exports.readUrlArchived = function(callback) {
  fs.readdir(exports.paths.archivedSites, function(err, files){
    if(err){
      throw err;
    }
    files = _.map(files, function(url){
      return path.basename(url, '.txt');
    });
    callback(files);
  });
}

exports.isUrlArchived = function(urlToMatch, callback) {

  var isArchived = function(urls){
    return _.some(urls, function(url){
      return url === urlToMatch;
    });
  };
  
  exports.readUrlArchived(function (array) {
    var result = isArchived(array);
    callback(result);
  });
};

exports.downloadUrls = function(url, data) {
  fs.writeFile(exports.paths.archivedSites+'/'+url+'.txt', data, function(err){
    if(err){
      throw err;
    }
    console.log('file created!');
  });
};
