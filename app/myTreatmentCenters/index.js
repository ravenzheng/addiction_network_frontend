var angular = require('angular'),
  moduleName = 'app.myTreatmentCenters';

angular.module(moduleName, [
    'ngRoute',
    require('../services')
  ])
  .component('centerTable', require('./centerTable'))
  .component('pagination', require('./pagination'))
  .component('centersMain', require('./main'))
  .component('myTreatmentCenters', {
    template: require('./view.html')
  })
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/my-treatment-centers', {
      redirectTo: '/my-treatment-centers'
    });
    $routeProvider.when('/my-treatment-centers', {
      template: '<my-treatment-centers></my-treatment-centers>',
    });
  }])

module.exports = moduleName;
