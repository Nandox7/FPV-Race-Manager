const {ipcRenderer} = require('electron');
// Subscibe to IPC in the main window
const {ipcMain} = require('electron').remote;

const serialport = require('serialport');

//window.ipc = window.ipc || {};
//ipc.messaging.init();

(function () {
    'use strict';

    angular.module('myApp')
        .controller('commsController', ['$state', '$scope', 'dbService', '$q', '$mdDialog', CommsController]);

    function CommsController($state, $scope, dbService, $q, $mdDialog) {
        console.log("Loading commsController...");
        
        var self = this;
        self.ports = {};
        self.selectedPort = null;
        self.selectedBaudrate = null;
        self.message = null;

        self.listPorts = listPorts;
        self.openPort = openPort;
        self.closePort = closePort;
        self.selectPort = selectPort;
        self.selectBaudrate = selectBaudrate;
        self.setMessage = setMessage;

        // Testing
        self.incChan = incChan;

        // Load initial data
        listPorts();

        //----------------------
        // Internal functions
        //----------------------
        function listPorts() {
            serialport.list( function(err, ports) {
                if(err) console.log('Error listing serial ports!');
                //ports.forEach(function(port) {
                    //console.log("Port: ", port.comName);
                    self.ports = [].concat(ports);
                    //self.selected = ports[0];
                //});
                console.log(self.ports);
            });
        };

        function selectPort(port){
            self.selectedPort = port;
        }

        function selectBaudrate(baudrate) {
            self.selectedBaudrate = baudrate;
        }

        function openPort() {
            console.log("Open port: " + self.selectedPort + " Baud: " + self.selectedBaudrate);
            if(self.selectedPort != null && self.selectedBaudrate != null) {              
                //ipcRenderer.send('start-serial', null);
                ipcRenderer.send('start-serial-listener', self.selectedPort);
                //self.message = "Port Opened: ", self.selectedPort;
            } else {
                self.message = "Please select the serial details!";
                $scope.obj.name = "Please select the serial details!";
            }
        }

        function closePort() {
            console.log("Close port: ", self.selectedPort);
            ipcRenderer.send('stop-serial-listener', null);
            //ipcRenderer.send('stop-serial', null);
            //self.message = "Port closed!";
        }

        function setMessage(message) {
            self.message = message;
            //$('#messageModal').modal('show');
        }

        function incChan() {
            ipcRenderer.send("serial-command", "incChannel");
        }

        // Register a IPC listener
        ipcMain.on('serial-message', (event, arg)=> {
            console.log("Serial message received: ", arg);
            self.setMessage(arg);
            $('#messageModal').modal('show');
        });
    }

})();
