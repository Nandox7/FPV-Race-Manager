var myApp = angular.module('myApp', ['ui.router', 'ngMaterial']);

console.log('Starting nyApp...');

myApp.config(function($stateProvider, $urlRouterProvider) {

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
    templateUrl: './components/pilots.html',
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
  $stateProvider.state(pilotsState);
  $stateProvider.state(pilotsNewState);
  $stateProvider.state(pilotsListState);
  $stateProvider.state(racesState);
  $stateProvider.state(resultsState);
  $stateProvider.state(settingsState);
  $stateProvider.state(settingsTestingState);

  $urlRouterProvider.otherwise('/default');
});
