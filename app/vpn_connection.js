'use-strict';

const spawn = require("child_process").spawn;
const ko = require("knockout");
const fs = require("fs");

const connected = "connected";
const connecting = "connecting";
const disconnected = "disconnected";

exports.connection = function (name, path) {
  var self = this;
  self.path = path;
  self.name = name;
  self.username = ko.observable("josh.charles");
  self.password = ko.observable("");
  self.status = ko.observable(disconnected);
  self.log = ko.observableArray();

  var internalConnection = null;
  var configFilePath = null;
  var tmpPassFilePath = "/tmp/vpn_up_login.conf";

  var files=fs.readdirSync(self.path);
  for(var i=0;i<files.length;i++){
      if (files[i].indexOf(".ovpn")>=0) {
          configFilePath = files[i];
      };
  };

  self.connect = function(){
    // write the password file
    var fileContents = self.username() + "\n" + self.password();
    fs.writeFileSync(tmpPassFilePath, fileContents);
    fs.chmod(tmpPassFilePath, '0700')
    // start the connection
    internalConnection = spawn('openvpn', [
      '--config',
      configFilePath,
      '--auth-user-pass',
      tmpPassFilePath
    ], {
      cwd: self.path
    });

    // register callbacks
    internalConnection.stdout.on('data', (data) => {
      if(data.includes("Initialization Sequence Completed")){
        self.status(connected);
      }
      self.log.push(`stdout: ${data}`);
      ;console.log(`stdout: ${data}`);
    });

    internalConnection.stderr.on('data', (data) => {
      self.log.push(`stderr: ${data}`);
      console.log(`stderr: ${data}`);
    });

    internalConnection.on('close', (code) => {
      self.status(disconnected);
    });

    self.status(connecting);
  }


  self.disconnect = function(){
      internalConnection.kill();
      //self.status(disconnected);
  }
};
