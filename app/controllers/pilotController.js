(function () {
    'use strict';

    angular.module('myApp')
        .controller('pilotController', ['dbService', '$q', '$mdDialog', PilotController]);

    function PilotController(dbService, $q, $mdDialog) {
        console.log("Loading controllers/pilotController...");
        var self = this;

        self.selected = null;
        self.pilots = [];
        self.selectedIndex = 0;
        self.filterText = null;
        self.selectPilot = selectPilot;
        self.deletePilot = deletePilot;
        self.savePilot = savePilot;
        self.createPilot = createPilot;
        self.viewPilot = viewPilot;
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
                dbService.destroy(self.selected.pilot_id).then(function (affectedRows) {
                    self.pilot.splice(self.selectedIndex, 1);
                });
            }, function () { });
        }

        function savePilot($event) {
            if (self.selected != null && self.selected.pilot_id != null) {
                // Temp fix to create full name
                self.selected.name = self.selectd.firstname + " " + self.selected.lastname;
                dbService.update(self.selected).then(function (affectedRows) {
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
            }  else {
                //self.selected.pilot_id = new Date().getSeconds();
                dbService.create(self.selected).then(function (affectedRows) {
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
            dbService.getPilots().then(function (pilots) {
                self.pilots = [].concat(pilots);
                self.selected = pilots[0];
            });
        }

        function filterPilot() {
            if (self.filterText == null || self.filterText == "") {
                getAllPilots();
            } else {
                dbService.getByName(self.filterText).then(function (pilots) {
                    self.pilots = [].concat(pilots);
                    self.selected = pilots[0];
                });
            }
        }

        function viewPilot_old($event) {
            if (self.selected != null && self.selected.pilot_id != null) {
                // Temp fix to create full name
                var name = self.selected.firstname + " " + self.selected.lastname;
                var content = 'Pilot Name: ' + name + '</br>Pilot ID: ' + self.selected.pilot_id ;
                $mdDialog.show(
                    $mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Pilot Details')
                        .content(content)
                        .ok('Ok')
                        .targetEvent($event)
                );

            }
        }

        function viewPilot($event) {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                template:
                '<md-dialog aria-label="List dialog">' +
                '  <md-dialog-content>'+
                '    <p>Name {{ pilotDetails.firstname + " " + pilotDetails.lastname }}</p>' +
                '    <p>Club: {{ pilotDetails.club }}</p>' +
                '  </md-dialog-content>' +
                '  <md-dialog-actions>' +
                '    <md-button ng-click="closeDialog()" class="md-primary">' +
                '      Close Dialog' +
                '    </md-button>' +
                '  </md-dialog-actions>' +
                '</md-dialog>',
                locals: {
                pilotDetails: self.selected
                },
                controller: DialogController
            });
            function DialogController($scope, $mdDialog, pilotDetails) {
                $scope.pilotDetails = pilotDetails;
                $scope.closeDialog = function() {
                    $mdDialog.hide();
                }
            }
        }
    }

})();
