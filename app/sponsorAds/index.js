var angular = require('angular'),
  moduleName = 'app.SponsorAds';

angular.module(moduleName, [
    'ui.router'
  ])
  .factory('SponsorAdsService', require('./service'))
  .component('sponsorAds', {
    template: require('./view.html'),
    controller: require('./ctrl')
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'sponsorAds',
      url: '/sponsor-ads',
      template: '<sponsor-ads></sponsor-ads>'
    });
  }]);


module.exports = moduleName;
