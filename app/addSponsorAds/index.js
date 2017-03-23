var angular = require('angular'),
  moduleName = 'app.addSponsorAds';

angular.module(moduleName, [
    'ui.router',
    require('../components'),
    require('../services')
  ])
  .factory('addSponsorAdsService', require('./service'))
  .component('addSponsorAds', {
    template: require('./view.html'),
    controller: require('./ctrl')
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'addSponsorAds',
      url: '/add-sponsor-ads',
      template: '<add-sponsor-ads></add-sponsor-ads>'
    });
  }])

module.exports = moduleName;
