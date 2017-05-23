var md5 = require('md5');

(function () {
    'use strict';

    angular.module('myApp')
        .controller('userController', ['$state', '$scope', 'dbService', '$q', '$mdDialog', UserController]);

    function UserController($state, $scope, dbService, $q, $mdDialog) {
        console.log("Loading userController...");

        var self = this;
        self.selected = null;
        self.selectedIndex = 0;
        self.users = [];
        self.filterText = null;
        self.selectUser = selectUser;
        self.deleteUser = deleteUser;
        self.saveUser = saveUser;
        self.createUser = createUser;
        self.viewUser = viewUser;
        self.filter = filterUser;

        // Load initial data
        console.log('Fetching all data...');
        getAllUsers();

        //----------------------
        // Internal functions
        //----------------------
        function selectUser(user, index) {
            self.selected = angular.isNumber(pilot) ? self.users[user] : user;
            self.selectedIndex = angular.isNumber(user) ? user: index;
            console.log("User selected: ", user);
        }

       function saveUSer($event) {
            if (self.selected != null && self.selected.id != null) {
                if(self.passwordChanges) {
                    // Encrypt user password if it changed
                    self.selected.password = md5(self.selected.password);
                }
                dbService.update(self.selected).then(function (affectedRows) {
                    $mdDialog.show(
                        $mdDialog
                            .alert()
                            .clickOutsideToClose(true)
                            .title('Success')
                            .content('User updated Successfully!')
                            .ok('Ok')
                            .targetEvent($event)
                    );
                });
            }  else {
                // Encrypt user password for storage
                self.selected.password = md5(self.selected.password);

                dbService.create(self.selected).then(function (affectedRows) {
                    $mdDialog.show(
                        $mdDialog
                            .alert()
                            .clickOutsideToClose(true)
                            .title('Success')
                            .content('User created Successfully!')
                            .ok('Ok')
                            .targetEvent($event)
                    );
                });
            }
            // Refresh list
            getAllPilots();
        }
    }

})();