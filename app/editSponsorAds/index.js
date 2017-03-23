var angular = require('angular'),
  ctrl = require('./ctrl'),
  htmlTemplate = require('./view.html'),
  htmlTemplateView = require('./edit.html'),
  service = require('./service'),
  moduleName = 'app.editSponsorAds';

angular.module(moduleName, [
    'ui.router',
    require('../components'),
    require('../services')
  ])
  .factory('editSponsorAdsService', service)
  .controller('editSponsorAdsCtrl', ctrl)
  .component('sponsorAdsEdit', {
    template: require('./edit.html')
  })
  .component('sponsorAdsView', {
    template: require('./view.html')
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'sponsorAdsEdit',
      url: '/sponsor-ads-edit/:id/:title',
      template: '<sponsor-ads-edit></sponsor-ads-edit>'
    });
    $stateProvider.state({
      name: 'sponsorAdsView',
      url: '/sponsor-ads-view/:id/:title',
      template: '<sponsor-ads-view></sponsor-ads-view>'
    });
  }]);

module.exports = moduleName;
