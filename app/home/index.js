var angular = require('angular'),
  moduleName = 'app.home';

angular.module(moduleName, ['ngRoute'])
  .component('stateMap', require('./map'))
  .component('welcome', require('./welcome'))
  .component('featuredTreatmentCenter', require('./featuredTreatmentCenter'))
  .component('searchByState', require('./searchByState'))
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      template: require('./view.html'),
      controller: 'HomeCtrl'
    })
  }])
  .factory('HomeListingService', require('./service'))
  .controller('HomeCtrl', require('./ctrl'));

module.exports = moduleName;
