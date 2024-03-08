const { app, BrowserWindow, ipcMain ,dialog } = require("electron");
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
      contextIsolation: false, // for IPC
    },
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "dist/my-electron-app/browser/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  win.on("closed", () => {
    win = null;
  });

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

async function runTerminalCommand(command, directory = null) {
  try {
    const options = directory ? { cwd: directory } : undefined;
    const { stdout, stderr } = await exec(command, options);
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
  } catch (error) {
    // console.error("Error executing command:", error);
    return error;
  }
}

async function selectDirectory(mainWindow) {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory']
    }).then(result => {
      if (!result.canceled && result.filePaths.length > 0) {
        resolve(result.filePaths[0]);
      } else {
        reject(new Error('No directory selected'));
      }
    }).catch(err => {
      reject(err);
    });
  });
}

ipcMain.on("runTerminalCommands", async (event, arg) => {
  await runTerminalCommand(arg.bashCommand, "/");
  await runTerminalCommand(arg.launchAutoware, "/");
});

ipcMain.on("openDirectory", async (event, arg) => {
  console.log('event: ', event);
  console.log('arg: ', arg);
  const selectedDirectory = await selectDirectory(win); // Pass mainWindow reference
  console.log('selectedDirectory: ', selectedDirectory);
    event.reply("directorySelected", selectedDirectory);
});
