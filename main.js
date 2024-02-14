const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const electronIpcMain = require('electron').ipcMain;
let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1300,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            allowFileAccess: true
        }
    });

    // shell.openItem(echo "Hello World")
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, 'dist/my-electron-app/browser/index.html'),
            protocol: 'file:',
            slashes: true
        })
    );

    win.on('closed', () => {
        win = null;
    });

    res = exec('ping xxx.xxx.xxx', Callback);
    win.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})