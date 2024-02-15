const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1300,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      allowFileAccess: true,
      contextIsolation: false // for IPC
    },
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "dist/my-electron-app/browser/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  win.on("closed", () => { win = null });

  win.webContents.openDevTools();
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

// Run Terminal Command
const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function terminalCommand() {
  console.log("TerminalCommand Method Executed:>> ");
  const { stdout, stderr } = await exec("node -v");
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);
}

ipcMain.on('runFun', (event, arg) => {
  console.log('IPC RUNNING VERY FAST');
  terminalCommand();
});