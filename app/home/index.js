var angular = require('angular'),
  // ngRoute = require('angular-route'),
  moduleName = 'app.home',
  service = require('./listingService'),
  ctrl = require('./listingCtrl');

angular.module(moduleName, ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: './home.html',
      controller: 'HomeCtrl'
    })
  }])
  .factory('SponsoredListingService', service)
  .controller('HomeCtrl', ctrl);

module.exports = moduleName;
