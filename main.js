// Modules to control application life and create native browser window
const path = require('path');
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const app = electron.app;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
Menu.setApplicationMenu(null);

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  if (!app.isPackaged)
  {
    // open DevTools in the dev mode
    mainWindow.webContents.openDevTools();
    if (process.argv[2] == '--dev' || process.argv[2] === undefined)
      mainWindow.loadURL('http://localhost:3000/');
    else if (process.argv[2] == '--build')
      mainWindow.loadURL(path.join(__dirname, './build/index.html'));
    else console.log("ERR: Invalid descriptor assigned."), process.exit();
  }
  else mainWindow.loadURL(path.join(__dirname, './build/index.html'));

  // this must be called after the loadURL()
  mainWindow.maximize();
  mainWindow.show();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow();
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
