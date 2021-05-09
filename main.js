// Modules to control application life and create native browser window
const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const app = electron.app;

// diabled the application menu
let mainWindow;
Menu.setApplicationMenu(null);

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      transparent: false,
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    }
  })

  // and load the index.html of the app.
  mainWindow.maximize();
  mainWindow.show();
  if (!app.isPackaged)
  {
    // Open the DevTools.
    mainWindow.loadURL('http://localhost:3000/');
    mainWindow.webContents.openDevTools();
  }
  else mainWindow.loadURL(path.join(__dirname, './build/index.html'));
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
