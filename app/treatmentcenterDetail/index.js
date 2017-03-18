var angular = require('angular'),
  moduleName = 'app.treatmentcenterDetail';

angular.module(moduleName, [
    'ngRoute'
  ])
  .factory('TreatmentcenterDetailService', require('./service'))
  .component('inquiryFormCard', require('./inquiryFormCard'))
  .component('treatmentcenterDetail', {
    template: require('./view.html'),
    controller: require('./ctrl')
  })
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/treatment_center/:id', {
      template: '<treatmentcenter-detail></treatmentcenter-detail>'
    });
  }]);

module.exports = moduleName;
