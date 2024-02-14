const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
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

    ls();

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

// run terminal command
const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function ls() {
    const { stdout, stderr } = await exec('node -v');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  }