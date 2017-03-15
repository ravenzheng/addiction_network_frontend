var angular = require('angular'),
  moduleName = 'app.addTreatmentCenter';

angular.module(moduleName, [
    'ngRoute',
    require('../user'),
    require('../components')
  ])
  .factory('TreatmentCenterService', require('./service'))
  .controller('AddTreatmentCenterCtrl', require('./ctrl'))
  .component('addTreatmentCenterMain', require('./main'))
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/add-treatment-center', {
      template: require('./view.html'),
      controller: 'AddTreatmentCenterCtrl'
    });
  }]);

module.exports = moduleName;
