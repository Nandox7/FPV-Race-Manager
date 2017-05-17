'use strict';
const {app, BrowserWindow, ipcMain} = require('electron');

// Global app settings
global.settings = {
	activeEvent: null,
	activeRace: null,
	activeRound: null,
	port: null,
	baudRate: null
};

// prevent window being garbage collected
let mainWindow;
let backgroundWindow;
let serverWindow;
let serialWindow;

// Tell us what Node version we using
console.log('Electron[Node] Version: ', process.versions.node);

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
	backgroundWindow = null;
}

function createMainWindow() {
	const win = new BrowserWindow({
		width: 1024,
		height: 768,
		icon: __dirname + '/app_icon.png'
	});

	win.loadURL(`file://${__dirname}/app/index.html`);
	win.on('closed', onClosed);

	// Show/Open DevTools
	win.webContents.openDevTools('detach');

	return win;
}

function createBackgroundWindow() {
	const win = new BrowserWindow({
		show: false
	});

	win.loadURL(`file://${__dirname}/app/services/background/index.html`);

	return win;
}

function createServer() {
	const win = new BrowserWindow({
		show: false
	});

	win.loadURL(`file://${__dirname}/app/services/server/index.html`);

	return win;
}

function createSerial() {
	const win = new BrowserWindow({
		show: false
	});

	win.loadURL(`file://${__dirname}/app/services/serial/serial.html`);

	// Show/Open DevTools
	//win.webContents.openDevTools('detach');

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
	app.quit;
	console.log("Main window closed...");
});


app.on('activate-with-no-open-windows', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
	//backgroundWindow = createBackgroundWindow()
	
	// Start web server
	serverWindow = createServer();
	
	// Start serial service
	serialWindow = createSerial();
});

function stopSerial() {
  serialWindow.removeAllListeners('close');
  serialWindow = null;
}



ipcMain.on('background-response', (event, payload) => mainWindow.webContents.send('background-response', payload));
ipcMain.on('background-start', (event, payload) => backgroundWindow.webContents.send('background-start', payload));

ipcMain.on('server-response', (event, payload) => mainWindow.webContents.send('server-response', payload));
ipcMain.on('server-start', (event, payload) => serverWindow.webContents.send('server-start', payload));
ipcMain.on('server-stop', (event, payload) => serverWindow.webContents.send('server-stop', payload));

ipcMain.on('stop-serial', function(event) {
  console.log("Stopping serial conn...");
  stopSerial();
});

ipcMain.on('start-serial', function(event) {
  console.log("Starting serial conn...");
  startSerial();
});