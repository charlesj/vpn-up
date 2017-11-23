'use strict';

const app = require("electron").remote.app;
const ko = require("knockout");
const jQuery = require("jquery");
const bootstrap = require("bootstrap");
const fs = require('fs');
const path = require("path");
const vpn_connection = require("./vpn_connection.js");

const dataDir = app.getPath("userData");
const connDir = "./vpns/";
require("./knockout_ext.js");

var connections = [];

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

var init = function(){
  var directories = getDirectories(connDir);
  directories.forEach(function(dir){
    if(dir != '.'){
      var fullPath = path.join(connDir, dir);
      var connection = new vpn_connection.connection(dir, fullPath);
      connections.push(connection);
    }
  })
}

var vm = {
  "connections": ko.observableArray(connections)
}

init();
ko.applyBindings(vm);
