var angular = require('angular'),
  appName = 'AddictionNetworkApp';

angular.module(appName, [
    'ngRoute',
    require('./components'), // provide common components
    require('./home'),
    require('./sponsorHome'),
    require('./treatmentcenterDetail'),
    require('./treatmentcenterMap'),
    require('./advertisement'),
    require('./myProfile'),
    require('./myTreatmentCenters'),
    require('./addTreatmentCenter'),
    require('./featuredTreatmentCenter'),
    require('./addSponsorAds'),
    require('./addListing')
  ])
  .component('header', require('./header'))
  .component('footer', require('./footer'))
  .constant('endPoint', require('./endPoint'))
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
  }]);

angular.bootstrap(document.getElementsByTagName('body')[0], [appName]);
