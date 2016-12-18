var myApp = angular.module('helloworld', ['ui.router']);

myApp.config(function($stateProvider) {
  var eventsState = {
    name: 'events',
    url: '/events',
    template: '<h3>Events UI</h3>'
  }

  var pilotsState = {
    name: 'pilots',
    url: '/pilots',
    template: '<h3>Pilots UI</h3>'
  }

  var racesState = {
    name: 'races',
    url: '/races',
    template: '<h3>Races UI</h3>'
  }

  var resultsState = {
    name: 'results',
    url: '/results',
    template: '<h3>Results UI</h3>'
  }

  var settingsState = {
    name: 'settings',
    url: '/settings',
    template: '<h3>Settings UI</h3>'
  }

  $stateProvider.state(eventsState);
  $stateProvider.state(pilotsState);
  $stateProvider.state(racesState);
  $stateProvider.state(resultsState);
  $stateProvider.state(settingsState);
});
