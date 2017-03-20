var angular = require('angular'),
  moduleName = 'app.addTreatmentCenter';

angular.module(moduleName, [
    'ngRoute',
    require('../components'),
    require('../services')
  ])
  .component('addTreatmentCenterMain', require('./main'))
  .component('addTreatmentCenter', {
    template: require('./view.html'),
    controller: require('./ctrl')
  })
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/add-treatment-center', {
      template: '<add-treatment-center></add-treatment-center>'
    });
  }]);

module.exports = moduleName;
