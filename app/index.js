var angular = require('angular'),
  appName = 'AddictionNetworkApp';

angular.module(appName, [
    'ngRoute',
    require('./home'),
    require('./sponsorHome'),
    require('./treatmentcenterDetail'),
    require('./treatmentcenterMap'),
    require('./advertisement'),
	require('./addTreatmentCenter')
  ])
  .component('header', require('./header'))
  .component('footer', require('./footer'))
  .constant('endPoint', require('./endPoint'))
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
  }]);

angular.bootstrap(document.getElementsByTagName('body')[0], [appName]);
