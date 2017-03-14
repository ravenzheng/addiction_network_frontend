var angular = require('angular'),
  moduleName = 'app.sponsorHome';

angular.module(moduleName, [
    'ngRoute',
    require('../sidePanel')
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/sponsorhome/:slug', {
      template: require('./view.html'),
      controller: 'SponsoredListingCtrl'
    });
  }])
  .factory('SponsoredListingService', require('./service'))
  .controller('SponsoredListingCtrl', require('./ctrl'));

module.exports = moduleName;
