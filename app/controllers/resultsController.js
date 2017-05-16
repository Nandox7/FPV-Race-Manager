(function () {
    'use strict';

    angular.module('myApp')
        .controller('resultsController', ['$state', '$scope', 'dbService', '$q', '$mdDialog', ResultsController]);

    function ResultsController($state, $scope, dbService, $q, $mdDialog) {
        console.log("Loading resultsController...");
        
        var self = this;
        self.events = [];
        self.races = [];
        self.laps = [];
        self.getAllEvents = getAllEvents;
        self.getAllRaces = getAllRaces;
        self.getRacesForEvent = getRacesForEvent;
        self.getLapsForRace = getLapsForRace;
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

        function clicked(filter) {
            console.log("Clicked: ", filter);
            $state.go('results.' + filter);
        }
    }

})();
