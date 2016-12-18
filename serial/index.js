'use strict';
const { ipcRenderer } = require('electron');

var sp = require('serialport');

// List available serial ports
sp.list(function(err, ports) {
	//console.log(ports);
	for (var i =0; i < ports.length; i++) {
		console.log(ports[i].comName);
	}
});
