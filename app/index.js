var angular = require('angular'),
  appName = 'AddictionNetworkApp';

angular.module(appName, [
    'ngRoute',
    require('./home'),
    require('./sidePanel'),
    require('./sponsoredListing'),
    require('./treatmentcenterDetail'),
    require('./treatmentcenterMap'),
    require('./advertisement')
  ])
  .component('header', require('./header'))
  .component('footer', require('./footer'))
  .constant('endPoint', require('./endPoint'))
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
  }]);

angular.bootstrap(document.getElementsByTagName('body')[0], [appName]);
