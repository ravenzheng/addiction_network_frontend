var angular = require('angular'),
  ctrl = require('./ctrl'),
  htmlTemplate = require('./view.html'),
  service = require('./service'),
  moduleName = 'app.SponsorAds';
angular.module(moduleName, [
    'ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/sponsor-ads/', {
      template: htmlTemplate,
    });
  }])
  .factory('SponsorAdsService', service)
  .controller('SponsorAdsCtrl', ctrl);

module.exports = moduleName;
