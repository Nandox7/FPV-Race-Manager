'use strict';
const { ipcRenderer } = require('electron');
// Subscibe to IPC in the main window
const {ipcMain} = require('electron').remote;
// Load the serialport module
const serialport = require('serialport')

var port = null
var buffer = new Buffer(1);
var dataBuffer = new Buffer(22);
var dataBufferIndex = 0;

// Register a IPC listener
ipcMain.on('start-serial-listener', (event, arg)=> {
    console.log("Asked to start...", arg);
	openPort(arg);
});

ipcMain.on('stop-serial-listener', (event, arg)=> {
    console.log("Asked to stop...", arg);
	if(port.isOpen()) {
		port.close();
	}
});

ipcMain.on('serial-command', (event, arg)=> {
    console.log("Asked to execute...", arg);
});

ipcMain.on('serial-command', (event, arg)=> {
    console.log("Asked to execute...", arg);
	switch(arg) {
		case "incChannel":
			incChannel()
			break;
		case "decChannel":
			decChannel();
			break;
        case "raceStart":
			raceStart();
			break;
        case "raceStop":
			raceStop();
			break;
        case "setThreshold":
			setThreshold();
			break;
		case "getData":
			getData();
			break;
		default:
			break;
	}
});

function sendMessage(message) {
	 ipcRenderer.send('serial-message', message);
     ipcRenderer.send('serial-message', null);
}

function openPort(comName) {
    port = new serialport(comName, {
        baudRate: 115200,
        databits: 8,
        parity: 'none',
        //parser: serialport.parsers.raw
        // Every entry is terminated with newline - dec 10
        parser: serialport.parsers.byteDelimiter([10])
    });

    port.on('open', _ => {
        console.log('Port open: ', comName);
		sendMessage("Port Open");
    });

    port.on('close', _ => {
        console.log('Port closed: ', comName);
		sendMessage("Port CLosed");
    });

    port.on('data', function(data) {
        console.log('Data: ' + data);
        //storeData(data);
        console.log(data)
        parseData(data);
    });

    port.on('error', (err) => {
        console.log('Error: ', err.message);
		sendMessage(err.message);
    });
}

// Serial Commands
// Increase channel
function incChannel() {
	buffer[0] = 0x06;
	port.write(buffer);
}

// Decrease channel
function decChannel() {
	buffer[0] = 0x05;
    port.write(buffer);
}

// Race Start
function raceStart() {
	buffer[0] = 0x01;
    port.write(buffer);
}

// Race Stop
function raceStop() {
	buffer[0] = 0x02;
    port.write(buffer);
}

// Set Threshold
function setThreshold() {
	buffer[0] = 0x09;
    port.write(buffer);
}

// Get data
function getData(){
	buffer[0] = 0xFF;
    port.write(buffer);
}

// Data Parsing
/*
    C + 4bits - channel index
    R + 4bits - Is race started
    M + Byte  - Min Lap Time
    T + Int   - RSSI Threshold
    S + Int   - RSSI value
    L + Long  - Lap Time

*/
function storeData(data){
    console.log('lenght', data.length);
    if(dataBufferIndex < 22) {
        dataBuffer = Buffer.concat([data, dataBuffer]);
        dataBufferIndex += data.length;
        console.log('test: ', dataBufferIndex);
    } 

    if(dataBufferIndex = 22) {
        console.log('Data: ', dataBuffer);
        parseData();
        dataBufferIndex = 0;
    }
}

function parseData(data) {
    switch (data[0]) {
        case 67: // Channel index
            console.log('Channel');
            var hexValue = "0x" + data[0];
            var letter = String(data[0]);
            console.log(letter.charCodeAt());
            break;
        case 82: // Is race started
            console.log('Is race started');
            break;
        case 77: // Min Lap Time
            console.log('Min Lap Time');
            break;
        case 84: // RSSI threshold
            console.log('RSSI Threshold');
            break;
        case 83: // RSSI value
        console.log('RSSI value');
            break;
        case 76: // Lap
        console.log('Lap details');
            break;
        default:
            console.log('Unkown data received...');
            break;
    }
}
