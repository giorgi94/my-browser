const fs = require("fs");
const electron = require("electron");
const { app, BrowserWindow, Menu } = electron;

const { ipcMain } = require("electron");




const template = [
    {
        label: "File",
        submenu: [
            { role: "reload" },
            { role: "forcereload" },
            { type: "separator" },
            { role: "toggledevtools" },
            { type: "separator" },
            { role: "close" }
        ]
    },
];



const menu = Menu.buildFromTemplate(template);

let mainWindow = null;



function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        fullscreenable: false,

        webPreferences: {
            webviewTag: true,
            nodeIntegration: true,
        }
    });

    mainWindow.setMenu(menu);
    mainWindow.setMenuBarVisibility(false);


    mainWindow.loadURL(`file://${__dirname}/layouts/main/ui.html`);

    mainWindow.on("closed", () => { mainWindow = null; });

    mainWindow.webContents.on("new-window", (e) => {
        e.preventDefault();
    });


    ipcMain.on("webview-event", (event, msg) => {
        mainWindow.webContents.send("webview-event", msg);
    });

}

app.on("ready", createWindow);


app.on("window-all-closed", function () {
    app.quit();
});
