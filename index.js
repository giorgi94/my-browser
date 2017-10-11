const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;


const template = [
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
  }
]



const menu = Menu.buildFromTemplate(template)

function createWindow () {
	let mainWindow = new BrowserWindow({
		width: 800, 
		height: 600,
		fullscreenable : false
  	});


    mainWindow.setMenu(menu);
  	

	mainWindow.loadURL(`file://${__dirname}/index.html`); 
	
	mainWindow.on('closed', () => { mainWindow = null; });
}

app.on('ready', createWindow);


app.on('window-all-closed', function() {
    app.quit();
});
