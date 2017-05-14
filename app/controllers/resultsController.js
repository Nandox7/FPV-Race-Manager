(function () {
    'use strict';


    angular.module('myApp')
        .controller('resultsController', ['dbService', '$q', '$mdDialog', ResultsController]);

    function ResultsController(dbService, $q, $mdDialog) {
        console.log("Loading resultsController...");
        var self = this;

        self.events = [];
        self.races = [];
        self.getAllEvents = getAllEvents;
        self.getAllRaces = getAllRaces;
        self.getRacesForEvent = getRacesForEvent;
        // Load initial data
        console.log('Fetching all data...');
        getAllEvents();
        getAllRaces();

        console.log("t", self.events);

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
            var query = "SELECT * FROM race WHERE id = " + event_id;
            dbService.select(query).then(function (rs) {
                self.races = [].concat(rs);
                self.selected = rs[0];
            });
        }
    }

})();
