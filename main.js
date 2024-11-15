const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 450,
    height: 704,
    resizable: false,
    frame: true,
    webPreferences: {
      nodeIntegration: false,  // Disable nodeIntegration for security
      contextIsolation: true,  // Enable contextIsolation
      preload: path.join(__dirname, 'preload.js'),  // Correctly specify the preload script path
      sandbox: false, // fixes require() in preloader
    }
  });

  // Load your HTML file and handle errors
  mainWindow.loadFile('index.html').catch(err => {
    console.error('Failed to load HTML file:', err);
    app.quit();  // Quit app if the file fails to load
  });

  mainWindow.setMenuBarVisibility(false);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
