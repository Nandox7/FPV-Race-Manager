'use strict';
const { ipcRenderer } = require('electron');
const task = require('../shared/task');


// Express - https://expressjs.com/en/guide/routing.html
var express = require("express");
var expressApp = express();
var server;
var port = 3000;

expressApp.get("/", function(req, res) {
	res.send("It works!");
});

window.onload = function () {
	ipcRenderer.on('server-start', (startTime) => {
		ipcRenderer.send('server-response', {
			data: "Server started!!!"
		});
		//server = expressApp.listen(port);
		server = expressApp.listen(port, function() {
  			console.log('Server listening...');
		});

		console.log("Server started...");
	});

	ipcRenderer.on('server-stop', (startTime) => {
		ipcRenderer.send('server-response', {
			data: "Server stopped!!!"
		});
		//server.close();
		//expressApp.close();
		server.close(function() { console.log('Connection closed...'); });
		console.log("Server stopped...");
	});
};

process.on('SIGTERM', function () {
  console.log("Closing");
  expressApp.close();
});
