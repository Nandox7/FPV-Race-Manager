var FileSaver = require('file-saver');

(function () {
    'use strict';

    angular.module('myApp')
        .controller('resultsController', ['$state', '$scope', 'dbService', '$q', '$mdDialog', ResultsController]);

    function ResultsController($state, $scope, dbService, $q, $mdDialog) {
        console.log("Loading resultsController...");
        
        $scope.exportFormats = [{
            value: 'HTML',
            label: 'HTML'
        }, {
            value: 'XLS',
            label: 'XLS'
        }];
        $scope.exportList = 'CSV';


        var self = this;
        self.events = [];
        self.races = [];
        self.laps = [];
        self.getAllEvents = getAllEvents;
        self.getAllRaces = getAllRaces;
        self.getRacesForEvent = getRacesForEvent;
        self.getLapsForRace = getLapsForRace;
        self.exportData = exportData;
        self.clicked = clicked;
        
        // Load initial data
        console.log('Fetching all data...');
        getAllEvents();
        //getAllRaces();

        //----------------------
        // Internal functions
        //----------------------
        function getAllEvents() {
            var query = "SELECT * FROM event;";
            dbService.select(query).then(function (rs) {
                self.events = [].concat(rs);
                self.selected = rs[0];
                console.log("r", self.events);
            });
        }

        function getAllRaces() {
            var query = "SELECT * FROM race;";
            dbService.select(query).then(function (rs) {
                self.events = [].concat(rs);
                self.selected = rs[0];
            });
        }

        function getRacesForEvent(event_id) {
            //var query = "SELECT * FROM race WHERE id = " + event_id +";";
            var query = "SELECT l.race_id, l.round FROM fpvrm.lap l, fpvrm.race r where r.event_id = " + event_id + " and r.id = l.race_id group by l.race_id, l.round;";
            console.log("Query: ", query);
            dbService.select(query).then(function (rs) {
                self.races = [].concat(rs);
                //self.selected = rs[0];
            });
        }

        function getLapsForRace(race_round) {
            console.log("Race: ", race_round);
            var details = race_round.split('-');
            var query = "SELECT * FROM fpvrm.lap where race_id = " + details[0] + " and round = " + details[1] + ";";
            console.log("Query: ", query);
            dbService.select(query).then(function (rs) {
                self.laps = [].concat(rs);
                //self.selected = rs[0];
            });
        }

        function exportData(format) {
            console.log("Export Format: ", format);
            var exportType, fileExtention = null;
            var fileName = "results_report";
            switch(format){
                case 'HTML':
                    exportType = "text/plain;charset=utf-8";
                    fileExtention = ".html";
                    break;
                case 'XLS':
                    exportType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"; 
                    fileExtention = ".xls";
                    break;
            }

            var blob = new Blob([$('#exportable').html()], {
                type: exportType
            })
            FileSaver.saveAs(blob, fileName + fileExtention);
        }

        function clicked(filter) {
            console.log("Clicked: ", filter);
            $state.go('results.' + filter);
        }
    }

})();
