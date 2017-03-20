var angular = require('angular'),
  moduleName = 'app.addSponsorAds';

angular.module(moduleName, [
    'ngRoute',
    require('../components'),
    require('../services')
  ])
  .factory('addSponsorAdsService', require('./service'))
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/add-sponsor-ads/', {
      template: require('./view.html'),
      controller: require('./ctrl')
    });
  }])

module.exports = moduleName;
