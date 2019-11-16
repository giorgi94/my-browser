const fs = require("fs");
const { join } = require("path");
const electron = require("electron");
const { app, BrowserWindow, Menu } = electron;

const { ipcMain } = require("electron");


const ReadConfig = () => {
    try {
        return JSON.parse(fs.readFileSync(join(__dirname, "data/config.json")));
    } catch (e) {
        console.log(e);
        return {
            "layout": {
                "default": "main"
            }
        };
    }
};


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

    const config = ReadConfig();

    mainWindow.loadURL(`file://${__dirname}/layouts/${config.layout.default}/ui.html`);

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
