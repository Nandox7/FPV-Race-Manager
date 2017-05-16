(function () {
    'use strict';

    angular.module('myApp')
        .controller('mainController', ['$state', '$scope', 'dbService', '$q', '$mdDialog', '$CurrentUser', MainController]);

    function MainController($state, $scope, dbService, $q, $mdDialog, $CurrentUser) {
        console.log("Loading resultsController...");
        
    }

})();
