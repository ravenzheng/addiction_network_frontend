var angular = require('angular'),
  ctrl = require('./ctrl'),
  htmlTemplate = require('./view.html'),
  htmlTemplateView = require('./edit.html'),
  service = require('./service'),
  moduleName = 'app.editSponsorAds';

angular.module(moduleName, [
    'ngRoute',
    require('../components'),
    require('../services')
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/sponsor-ads-edit/:id/:title', {
      template: htmlTemplate
    }).when('/sponsor-ads-view/:id/:title', {
      template: htmlTemplateView
    });
  }])
  .factory('editSponsorAdsService', service)
  .controller('editSponsorAdsCtrl', ctrl);

module.exports = moduleName;
