#!/usr/bin/env node
process.env.UV_THREADPOOL_SIZE = 128;
// Modules to control application life and create native browser window
const path = require("path");
const fs = require("fs");
const request = require("request");
const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const app = electron.app;
const ipcMain = electron.ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
Menu.setApplicationMenu(null);
global.environ = electron.app.isPackaged
  ? "release"
  : process.argv[2] === "--build"
  ? "build"
  : "dev";
const staticPath =
  global.environ === "release"
    ? "./resources/app/build/"
    : environ === "build"
    ? "./build/"
    : "./";

function createStaticFile(fileName) {
  if (!fs.existsSync(path.join(staticPath, fileName)))
    fs.mkdirSync(path.join(staticPath, fileName));
}
createStaticFile("static/img");
createStaticFile("static/avatar");
createStaticFile("static/temp");

function createWindow() {
  // Create the browser window.
  let mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  });

  if (global.environ === "release") {
    mainWindow.loadURL(path.join(
      __dirname,
      "build/index.html"
    ));
  } else if (global.environ === "build") {
    mainWindow.loadURL(path.join(
      __dirname,
      path.join(staticPath, "index.html")
    ));
  } else {
    mainWindow.loadURL("http://localhost:3000/");
  }

  // this must be called after the loadURL()
  mainWindow.maximize();
  mainWindow.show();
  mainWindow.on("close", (err) =>
  {
    err.preventDefault();
    err.preventDefault();
    mainWindow.webContents.send("sign-uid");
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("uid", (event, proxy, uid) => {
  if (uid !== undefined)
    request({
      url: `${proxy}sign/out?userid=${uid}`,
      method: "GET",
      json: true,
      headers: {
        "content-type": "text/plain",
      }
    }, () => {});
  app.exit();
})

ipcMain.on("new-window", () => {
  createWindow();
})