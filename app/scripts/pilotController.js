(function () {
    'use strict';

    angular.module('myApp')
        .controller('pilotController', ['pilotService', '$q', '$mdDialog', PilotController]);

    function PilotController(pilotService, $q, $mdDialog) {
        console.log("Loading pilotController...");
        var self = this;

        self.selected = null;
        self.pilots = [];
        self.selectedIndex = 0;
        self.filterText = null;
        self.selectPilot = selectPilot;
        self.deletePilot = deletePilot;
        self.savePilot = savePilot;
        self.createPilot = createPilot;
        self.filter = filterPilot;

        // Load initial data
        console.log('Fetching all data...');
        getAllPilots();

        //----------------------
        // Internal functions
        //----------------------

        function selectPilot(pilot, index) {
            self.selected = angular.isNumber(pilot) ? self.pilots[pilot] : pilot;
            self.selectedIndex = angular.isNumber(pilot) ? pilot: index;
        }

        function deletePilot($event) {
            var confirm = $mdDialog.confirm()
                                   .title('Are you sure?')
                                   .content('Are you sure want to delete this pilot?')
                                   .ok('Yes')
                                   .cancel('No')
                                   .targetEvent($event);


            $mdDialog.show(confirm).then(function () {
                pilotService.destroy(self.selected.pilot_id).then(function (affectedRows) {
                    self.pilot.splice(self.selectedIndex, 1);
                });
            }, function () { });
        }

        function savePilot($event) {
            if (self.selected != null && self.selected.pilot_id != null) {
                // Temp fix to create full name
                self.selected.name = self.selectd.firstname + " " + self.selected.lastname;
                pilotService.update(self.selected).then(function (affectedRows) {
                    $mdDialog.show(
                        $mdDialog
                            .alert()
                            .clickOutsideToClose(true)
                            .title('Success')
                            .content('Data Updated Successfully!')
                            .ok('Ok')
                            .targetEvent($event)
                    );
                });
            }
            else {
                //self.selected.pilot_id = new Date().getSeconds();
                pilotService.create(self.selected).then(function (affectedRows) {
                    $mdDialog.show(
                        $mdDialog
                            .alert()
                            .clickOutsideToClose(true)
                            .title('Success')
                            .content('Data Added Successfully!')
                            .ok('Ok')
                            .targetEvent($event)
                    );
                });
            }
        }

        function createPilot() {
            self.selected = {};
            self.selectedIndex = null;
        }

        function getAllPilots() {
            pilotService.getPilots().then(function (pilots) {
                self.pilots = [].concat(pilots);
                self.selected = pilots[0];
            });
        }

        function filterPilot() {
            if (self.filterText == null || self.filterText == "") {
                getAllPilots();
            }
            else {
                pilotService.getByName(self.filterText).then(function (pilots) {
                    self.pilots = [].concat(pilots);
                    self.selected = pilots[0];
                });
            }
        }
    }

})();
