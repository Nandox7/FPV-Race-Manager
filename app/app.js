// app/app.js

window.$ = window.jQuery = require('jquery');
require('bootstrap');
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
/*
  var defaultState = {
    name: 'default',
    url: '/default',
    templateUrl: './components/default.html'
  }

  var eventsState = {
    name: 'events',
    url: '/events',
    templateUrl: './components/events.html'
  }

  var eventsNewState = {
    name: 'events_new',
    url: '/events_new',
    templateUrl: './components/events_new.html'
  }

  var eventsNewPilotsState = {
    name: 'events_new_pilots',
    url: '/events_new_pilots',
    templateUrl: './components/events_new_pilots.html'
  }

  var eventsNewRaceState = {
    name: 'events_new_race',
    url: '/events_new_race',
    templateUrl: './components/events_new_race.html'
  }

  var eventsNextState = {
    name: 'events_next',
    url: '/events_next',
    templateUrl: './components/events_next.html'
  }

  var eventsPastState = {
    name: 'events_past',
    url: '/events_past',
    templateUrl: './components/events_past.html'
  }

  var pilotsState = {
    name: 'pilots',
    url: '/pilots',
    templateUrl: './views/pilots.html',
    controller: 'pilotController',
    controllerAs: '_ctrl'
  }

  var pilotsNewState = {
    name: 'pilots_new',
    url: '/pilots_bew',
    templateUrl: './components/pilots_new.html',
    controller: 'pilotController',
    controllerAs: '_ctrl'
  }

  var pilotsListState = {
    name: 'pilots_list',
    url: '/pilots_list',
    templateUrl: './components/pilots.html',
    controller: 'pilotController',
    controllerAs: '_ctrl'
  }

  var racesState = {
    name: 'races',
    url: '/races',
    templateUrl: './components/races.html'
  }

  var resultsState = {
    name: 'results',
    url: '/results',
    templateUrl: './components/results.html'
  }

  var settingsState = {
    name: 'settings',
    url: '/settings',
    templateUrl: './components/settings.html'
  }

  var settingsTestingState = {
    name: 'settings_testing',
    url: '/settings_testing',
    templateUrl: './components/settings_testing.html'
  }

  var settingsTestingState = {
    name: 'settings_testing',
    url: '/settings_testing',
    templateUrl: './scripts/pilot/pilotView.html',
    controller: 'customerController',
    controllerAs: '_ctrl'
  }

  $stateProvider.state(defaultState);
  $stateProvider.state(eventsState);
  $stateProvider.state(eventsNewState);
  $stateProvider.state(eventsNewPilotsState);
  $stateProvider.state(eventsNewRaceState);
  $stateProvider.state(eventsNextState);
  $stateProvider.state(eventsPastState);

  $stateProvider.state(pilotsNewState);
  $stateProvider.state(pilotsListState);
  $stateProvider.state(racesState);
  $stateProvider.state(resultsState);
  $stateProvider.state(settingsState);
  $stateProvider.state(settingsTestingState);
*/
  $urlRouterProvider.otherwise('/pilots');

    $stateProvider
      // Events Section ----------------------
      .state('events', {
        //url: '/events',
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
        //url: '/new',
        templateUrl: './views/events/partials/events_new_rounds.html'
      })

      // Events List Next
      .state('events.next', {
        url: '/next',
        templateUrl: './views/events/partials/events_next.html'
      })

      .state('events.past', {
        url: '/past',
        templateUrl: './views/events/partials/events_past.html'
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
      templateUrl: './views/pilots/partials/pilots_list.html'
    })

    // Results Section ----------------------
    .state('results', {
      //url: '/results',
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
      url: '/pilot',
      templateUrl: './views/results/partials/results_table_pilot.html'
    })

    // Results per lap
    .state("results.lap", {
      url: '/lap',
      templateUrl: './views/results/partials/results_table_lap.html'
    })

    // Results per time
    .state("results.time", {
      url: '/time',
      templateUrl: './views/results/partials/results_table_time.html'
    })
});
