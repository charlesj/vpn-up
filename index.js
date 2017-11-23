'use strict';
const electron = require('electron');
const app = electron.app;

var BrowserWindow = electron.BrowserWindow;
app.open_connections = [];

let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/app/icon.png'})

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/app/index.html`)
  mainWindow.setMenu(null);
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null;
    // TODO: Kill all the connections
  })
}

app.on('ready', createWindow);
