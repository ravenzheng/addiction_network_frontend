var angular = require('angular'),
  // ngRoute = require('angular-route'),
  moduleName = 'app.sponsoredListing',
  service = require('./listingService'),
  ctrl = require('./listingCtrl');

angular.module(moduleName, ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/sponsorhome', {
      templateUrl: './sponsoredListing.html',
      controller: 'SponsoredListingCtrl'
    })
  }])
  .factory('SponsoredListingService', service)
  .controller('SponsoredListingCtrl', ctrl);

module.exports = moduleName;
