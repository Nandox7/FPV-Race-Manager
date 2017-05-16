(function () {
    'use strict';

    var today = new Date().toISOString().slice(0, 10);

    angular.module('myApp')
        .controller('eventsController', ['dbService', '$q', '$mdDialog', '$stateParams', EventsController]);

    function EventsController(dbService, $q, $mdDialog, $stateParams) {
        console.log("Loading eventsController...");
        var self = this;

        self.selected = null;
        self.selectedIndex = 0;
        self.events = [];
        self.races = [];
        self.selectEvent = selectEvent;
        self.getAllEvents = getAllEvents;
        self.getNextEvents = getNextEvents;
        self.getPastEvents = getPastEvents;
        self.getAllRaces = getAllRaces;
        self.getRacesForEvent = getRacesForEvent;
        self.removeRace = removeRace;
        self.filter = filterEvent;
        
        // Load initial data
        console.log('Fetching all data...');
        switch($stateParams.filter){
            case "next":
                getNextEvents();
                break;
            case "past":
                getPastEvents();
                break;
            default:
                getAllEvents();
        }
        //getAllRaces();

        //----------------------
        // Internal functions
        //----------------------
        
        function selectEvent(event, index) {
            console.log("Event selected: ", index);
            self.selected = angular.isNumber(event) ? self.events[event] : event;
            self.selectedIndex = angular.isNumber(event) ? event: index;
        }
        
        function filterEvent() {
            if (self.filterText == null || self.filterText == "") {
                getAllEvents();
            } else {
                var query = "SELECT * from event WHERE name like '%" + self.filterText + "%';";
                console.log("Query: ", query);
                dbService.select(query).then(function (events) {
                    self.events = [].concat(events);
                    self.selected = events[0];
                });
            }
        }

        function getAllEvents() {
            var query = "SELECT * FROM event;";
            dbService.select(query).then(function (rs) {
                self.events = [].concat(rs);
                self.selected = rs[0];
                console.log("r", self.events);
            });
        }

        function getNextEvents() {
            var query = "SELECT * FROM event where date >= '" + today + "';";
            console.log("Query: ", query);
            dbService.select(query).then(function (rs) {
                self.events = [].concat(rs);
                self.selected = rs[0];
                console.log("Results: ", self.events);
            });
        }

        function getPastEvents() {
            var query = "SELECT * FROM event where date < '" + today + "';";
            console.log("Query: ", query);
            dbService.select(query).then(function (rs) {
                self.events = [].concat(rs);
                self.selected = rs[0];
                console.log("Results: ", self.events);
            });
        }

        function getEventById(event_id) {
            var query = "SELECT * from event where id = "+ event_id +";";
            dbService.select(query).then(function (rs) {
                self.selected = rs[0];
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
            var query = "SELECT * FROM race WHERE id = " + event_id + ";";
            dbService.select(query).then(function (rs) {
                self.races = [].concat(rs);
                self.selected = rs[0];
            });
        }

            self.addRace = function(races){
	            self.races.push({ 
	                'fname': '', 
	                'lname': '',
	                'email': '',
	            });
	            self.PD = {};
	        };
	    
	     function removeRace(){
	            var newDataList=[];
	            self.selectedAllRaces = false;
	            angular.forEach(self.races, function(selected){
	                if(!selected.selected){
	                    newDataList.push(selected);
	                }
	            }); 
	            self.races = newDataList;
	        };
	    
	        self.checkAllRaces = function () {
	            if (!self.selectedAll) {
	                self.selectedAll = true;
	            } else {
	                self.selectedAll = false;
	            }
	            angular.forEach(self.races, function (races) {
	                races.selected = self.selectedAll;
	            });
           };    
    }
})();
