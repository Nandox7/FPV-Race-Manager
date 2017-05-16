// app/app.js

window.$ = window.jQuery = require('jquery');
require('bootstrap');
require('bootstrap-table');
require('angular');
require('angular-animate');
require('angular-aria');
require('angular-material');
require('angular-messages');
require('angular-smart-table');
require('angular-ui-router');

var myApp = angular.module('myApp', ['ui.router', 'ngMaterial']);

console.log('Starting nyApp...');

myApp.config(function($stateProvider, $urlRouterProvider) {

    function CheckForAuthenticatedUser(ParseService, $state) {
      return ParseService.getCurrentUser().then(function (_user) {
          // if resolved successfully return a user object that will set
          // the variable `resolvedUser`
          return _user;
      }, function (_error) {
          $state.go('login');
      })
    }

  $urlRouterProvider.otherwise('/results');

    $stateProvider
      // Abstract state to use with login
      .state('app', {
          url: "/app",
          template: '<ion-nav-view></ion-nav-view>',
          abstract : true,
          resolve : {
              resolvedUser : CheckForAuthenticatedUser
          }
      })

      .state('login', {
          url: "/login",
          templateUrl: "views/login.html",
          controller: "loginController",
      })

      .state('app.main', {
        url: "/main",
        templateUrl: "./views/main.html",
        controller: "mainController",
        controllerAs: "_ctrl",
        resolve: {
          CurrentUser: function(resolvedUser) {
            return resolvedUser;
          }
        }
      })

      // Events Section ----------------------
      .state('events', {
        url: '/events',
        views: {
          '': {
            templateUrl: './views/events/events.html',
            controller: 'eventsController',
            controllerAs: '_ctrl'
          },
          "navbar@events": {
            templateUrl: './views/events/partials/events_navbar.html'
          }
        }
      })

      // Events New
      .state('events.new', {
        //url: '/new',
        templateUrl: './views/events/partials/events_new.html'
      })

      // Events New - Event Details
      .state('events.new.event', {
        //url: '/new',
        templateUrl: './views/events/partials/events_new_event.html'
      })
      // Events New - Pilots in Event
      .state('events.new.pilots', {
        //url: '/new',
        templateUrl: './views/events/partials/events_new_pilots.html'
      })

      // Events New - Races Settings
      .state('events.new.races', {
        //url: '/new',
        templateUrl: './views/events/partials/events_new_races.html'
      })

      // Events New - Rounds Settings
      .state('events.new.rounds', {
        url: '/new',
        templateUrl: './views/events/partials/events_new_rounds.html'
      })

      // Events List Next
      .state('events.list', {
        url: '/list/:filter',
        templateUrl: './views/events/partials/events_list.html',
        controller: 'eventsController as _ctrl'
      })

      // Pilots Section ----------------------
      .state('pilots', {
        url: '/pilots',
        views: {
          '': {
            templateUrl: './views/pilots/pilots.html',
            controller: 'pilotController',
            controllerAs: '_ctrl'
          },
          "navbar@pilots": {
            templateUrl: './views/pilots/partials/pilots_navbar.html'
          }
         }
        }
      )

    // Pilots New
    .state("pilots.new", {
      url: '/new', 
      templateUrl: './views/pilots/partials/pilots_new.html'
    })

    // Pilots Edit
    .state("pilots.edit", {
      url: '/edit', 
      templateUrl: './views/pilots/partials/pilots_edit.html',
      controller: function($scope, $stateParams) {
        $scope.pilot_id = $stateParams.pilot_id;
        console.log("Editng pilot id: " + $scope.pilot_id);
      }
    })

    // Pilots List
    .state("pilots.list", {
      url: '/list', 
      templateUrl: './views/pilots/partials/pilots_list.html',
    })
    
    // Races Section ----------------------
    .state('races', {
      url: '/races',
      views: {
        '': {
          templateUrl: './views/races/races.html',
          //controller: 'raceController',
          //controllerAs: '_ctrl'
        },
        "navbar@races": {
          templateUrl: './views/races/partials/races_navbar.html'
        }
        }
      }
    )


    // Results Section ----------------------
    .state('results', {
      url: '/results',
      views: {
        '': {
          templateUrl: './views/results/results.html',
          controller: 'resultsController',
          controllerAs: '_ctrl'
        },
        "navbar@results": {
          templateUrl: './views/results/partials/results_navbar.html'
        }
      }
    })

    // Results per pilot
    .state("results.pilot", {
      url: '/rpilot',
      templateUrl: './views/results/partials/results_table_pilot.html'
    })

    // Results per lap
    .state("results.lap", {
      url: '/rlap',
      templateUrl: './views/results/partials/results_table_lap.html'
    })

    // Results per time
    .state("results.time", {
      url: '/rtime',
      templateUrl: './views/results/partials/results_table_time.html'
    })

    // Settings Section ----------------------
    .state('settings', {
      url: '/settings',
      views: {
        '': {
          templateUrl: './views/settings/settings.html',
          //controller: 'settingsController',
          //controllerAs: '_ctrl'
        },
        "navbar@settings": {
          templateUrl: './views/settings/partials/settings_navbar.html'
        }
        }
      }
    )
});
