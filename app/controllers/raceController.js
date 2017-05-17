

(function () {
    'use strict';

    angular.module('myApp')
        .controller('raceController', ['$state', '$scope', 'dbService', '$q', '$mdDialog', RaceController]);

    function RaceController($state, $scope, dbService, $q, $mdDialog) {
        console.log("Loading raceController...");

        var self = this;

        self.incChan = incChan;
        self.decChan = decChan;
        self.raceStart = raceStart;
        self.raceStop = raceStop;
        self.setThreshold = setThreshold;
        self.getData = getData;

        function incChan() {
            ipcRenderer.send("serial-command", "incChannel");
        }

        function decChan() {
            ipcRenderer.send("serial-command", "decChannel");
        }

        function raceStart() {
            ipcRenderer.send("serial-command", "raceStart");
        }

        function raceStop() {
            ipcRenderer.send("serial-command", "raceStop");
        }

        function setThreshold() {
            ipcRenderer.send("serial-command", "setThreshold");
        }
        
        function getData() {
            ipcRenderer.send("serial-command", "getData");
        }

        // Register a IPC listener
        ipcMain.on('serial-message', (event, arg)=> {
            console.log("Serial message received: ", arg);
            //self.setMessage(arg);
            //$('#messageModal').modal('show');
        });

    }

})();