(function () {
    'use strict';

    angular.module('myApp')
        .controller('loginController', ['$scope', '$state', 'dbService', '$timeout', LoginController]);

    function LoginController($scope, $state, dbService, $timeout) {
        console.log("Loading loginController...");

        //var self = this;
        $scope.credentials = {};

        $scope.doLoginAction = function () {
            ParseService.login($scope.credentials).then(function (_user) {
                $timeout(function () {
                    $state.go('app.home', {});
                    console.log("user", _user);
                }, 2);

            }, function (_error) {
                alert("Login Error " + (_error.message ? _error.message: _error.data.error));
            });
        }
    }

})();
