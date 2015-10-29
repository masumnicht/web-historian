var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  callback = callback || function(el) {return el}
  fs.readFile(exports.paths.list, function(err, data){
    if(err){
      throw err
    }
    //console.log(data.toString().split(/\r\n|\r|\n/g))
    // var data = data.toString().split(/\r\n|\r|\n/g);
    //console.log('...',data);
    callback(data.toString().split(/\r\n|\r|\n/g))
  })

};

exports.isUrlInList = function(urlToMatch) {
  var urls = readListOfUrls();
  return _.some(urls, function(url){
    if(url === urlToMatch){
      return true;
    };
  });

};

exports.addUrlToList = function(url) {
  fs.appendFile(exports.paths.list, url+'\n', function (err) {
    if (err){
      throw err;
    }
    console.log('The "data to append" was appended to file!');
  });
};

exports.readUrlArchived = function(callback) {
  //callback = callback || function(el) { return el; }
  console.log('here')
  fs.readdir(exports.paths.archivedSites, function(err, files){
    console.log(files)
    if(err){
      throw err
    }  
    console.log('a')
    
    files = _.map(files, function(url){
      return path.basename(url, '.txt');
    });

    callback(files);
  });
  
}

exports.isUrlArchived = function(urlToMatch, callback) {
  // var urls = exports.readUrlArchived();
  // console.log(urls)
  //var isFind = false;

  var isArchived = function(urls){
    return _.some(urls, function(url){
      //url = path.basename(url, '.txt');
      console.log(url)
      return url === urlToMatch;
    });
  };
  console.log('sdjhsadfjkshkj')
  
  exports.readUrlArchived(function (array) {
    var result = isArchived(array);
    callback(result);
  });

};

exports.downloadUrls = function(url, data) {
  fs.writeFile(url+'.txt', data, function(err){
    if(err){
      throw err
    }
    console.log('file created!');
  });
};
