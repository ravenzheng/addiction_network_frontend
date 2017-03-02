var angular = require('angular'),
  ctrl = require('./ctrl'),
  htmlTemplate = require('./view.html'),
  service = require('./service'),
  moduleName = 'app.treatmentcenterDetail';

angular.module(moduleName, [
    require('./inquiryFormCard')
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/treatment_center_detail', {
      template: htmlTemplate,
      controller: 'TreatmentcenterDetailCtrl'
    });
  }])
  .factory('TreatmentcenterDetailService', service)
  .controller('TreatmentcenterDetailCtrl', ctrl);

module.exports = moduleName;
