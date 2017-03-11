var angular = require('angular'),
  ctrl = require('./ctrl'),
  htmlTemplate = require('./treatment-center-map.html'),
  service = require('./service'),
  moduleName = 'app.treatmentcenterMap';
  
angular.module(moduleName, ['ngRoute'])
.component('stateMapTreatment', require('./map'))
.component('searchByStateTreatment', require('./searchByState'))
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/treatment-center-map', {
      template: htmlTemplate,
      controller: 'TreatmentcenterMapCtrl'
    });
  }])
  .factory('TreatmentcenterMapService', service)
  .controller('TreatmentcenterMapCtrl', ctrl);

module.exports = moduleName;
