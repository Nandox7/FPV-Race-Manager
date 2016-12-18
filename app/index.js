'use strict';
const { ipcRenderer } = require('electron');
const task = require('../shared/task');
var remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;

var serverStatus = false;

window.onload = function () {
	setInterval(() => {
		const progressBar = document.getElementById('progress-bar');
		const maxValue = parseInt(progressBar.getAttribute('max'), 10);
		let nextValue = parseInt(progressBar.getAttribute('value'), 10) + 1;

		if (nextValue > maxValue) {
			nextValue = 0;
		}

		progressBar.setAttribute('value', nextValue);
	}, 25);

	function startProcess() {
		document.getElementById('status').textContent = 'Started!';
	}

	function finishProcess(result, timeElapsed) {
		document.getElementById('status').textContent =
			'Finished with a result of: ' +
			result +
			' in ' +
			(timeElapsed / 1000) +
			' seconds';
	}

	const rendererButton = document.getElementById('in-renderer');

	rendererButton.onclick = function longRunningRendererTask() {
		const startTime = new Date();

		// Note that the UI won't update with this call since we're stuck in a JavaScript process and the UI is
		// unresponsive until this loop finishes. The div will go straight to finished.
		startProcess();

		finishProcess(task(), new Date() - startTime);
	};

	const backgroundButton = document.getElementById('in-background');

	backgroundButton.onclick = function longRunningBackgroundTask() {
		// We have to cast to a number because crossing the IPC boundary will convert the Date object to an empty object.
		// Error, Date and native objects won't be able to be passed around via IPC.
		const backgroundStartTime = +new Date();

		startProcess();
		ipcRenderer.send('background-start', backgroundStartTime);
	}

	ipcRenderer.on('background-response', (event, payload) => {
		finishProcess(payload.result, new Date() - payload.startTime);
	});

	const serverButton = document.getElementById('in-server');

	serverButton.onclick = function longRunningServerTask() {

		startProcess();
		console.log("btnServer pressed: " + serverStatus);
		// Flip serverStatus state
		serverStatus = !serverStatus;
		if (serverStatus) {
			ipcRenderer.send('server-start');
		} else {
			ipcRenderer.send('server-stop');
		}

	}

	ipcRenderer.on('server-response', (event, payload) => {
		console.log(payload.data);
	});

	const serialButton = document.getElementById('in-serial');

	serialButton.onclick = function longRunningSerialTask() {

		console.log("btnSerial pressed");
		startProcess();
		createSerial();

	}

	ipcRenderer.on('server-response', (event, payload) => {
		console.log(payload.data);
	});

function createSerial() {
	const win = new BrowserWindow({
		show: true
	});

	win.loadURL(`file://${__dirname}/../serial/index.html`);

	return win;
}
};
