const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
	win = new BrowserWindow({
		width: 720,
		height: 480,
		minHeight: 256, 
		minWidth: 192,
		maxHeight: 480,
		maxWidth: 720,
		maximizable: false,
		fullscreenable: false,
		webPreferences: {
			nodeIntegration: true
		}
  	})

	win.loadFile('index.html');
	  
	win.setMenuBarVisibility(false);
  	//win.webContents.openDevTools();

  	win.on('closed', () => {
  		win = null
  	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
 	if (process.platform !== 'darwin') {
  		app.quit()
  	}
})