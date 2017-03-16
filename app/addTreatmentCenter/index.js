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
  .component('addTreatmentCenter', {
    template: require('./view.html'),
    controller: 'AddTreatmentCenterCtrl'
  })
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/add-treatment-center', {
      template: '<add-treatment-center></add-treatment-center>'
    });
  }]);

module.exports = moduleName;
