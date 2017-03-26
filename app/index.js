var angular = require('angular'),
  appName = 'AddictionNetworkApp';

angular.module(appName, [
    'ui.router',
    require('./home'),
    require('./sponsorHome'),
    require('./treatmentCenterDetail'),
    require('./treatmentCenterMap'),
    require('./advertisement'),
    require('./bannerAds'),
    require('./myProfile'),
    require('./myTreatmentCenters'),
    require('./addTreatmentCenter'),
    require('./editTreatmentCenter'),
    require('./featuredTreatmentCenter'),
    //require('./addSponsorAds'),
    require('./addListing'),
    //require('./editSponsorAds'),
    require('./sponsorAds')
  ])
  .component('header', require('./header'))
  .component('footer', require('./footer'))
  .constant('endPoint', require('./endPoint'))
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
  }])
  .config(['$urlRouterProvider', function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }]);

angular.bootstrap(document.getElementsByTagName('body')[0], [appName]);
