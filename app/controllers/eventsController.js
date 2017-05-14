(function () {
    'use strict';

    angular.module('myApp')
        .controller('eventsController', ['dbService', '$q', '$mdDialog', EventsController]);

    function EventsController(dbService, $q, $mdDialog) {
        console.log("Loading eventsController...");
        var self = this;

            self.raceDetails = [
	        {
	            'fname':'Muhammed',
	            'lname':'Shanid',
	            'email':'shanid@shanid.com'
	        },
	        {
	            'fname':'John',
	            'lname':'Abraham',
	            'email':'john@john.com'
	        },
	        {
	            'fname':'Roy',
	            'lname':'Mathew',
	            'email':'roy@roy.com'
	        }];

        self.events = [];
        self.races = [];
        self.getAllEvents = getAllEvents;
        self.getAllRaces = getAllRaces;
        self.getRacesForEvent = getRacesForEvent;
        self .removeRace = removeRace;
        
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

            self.addNew = function(raceDetails){
	            self.raceDetails.push({ 
	                'fname': '', 
	                'lname': '',
	                'email': '',
	            });
	            self.PD = {};
	        };
	    
	     function removeRace(){
	            var newDataList=[];
	            self.selectedAll = false;
	            angular.forEach(self.raceDetails, function(selected){
	                if(!selected.selected){
	                    newDataList.push(selected);
	                }
	            }); 
	            self.raceDetails = newDataList;
	        };
	    
	        self.checkAll = function () {
	            if (!self.selectedAll) {
	                self.selectedAll = true;
	            } else {
	                self.selectedAll = false;
	            }
	            angular.forEach(self.raceDetails, function (raceDetails) {
	                raceDetails.selected = self.selectedAll;
	            });
	        };    
    }

})();
