var angular = require('angular'),
  moduleName = 'app.addTreatmentCenter';

angular.module(moduleName, [
  'ui.router',
  require('../components'),
  require('../services')
]).component('addTreatmentCenterMain', require('./main'))
  .component('addTreatmentCenter', {
    template: require('./view.html'),
    controller: require('./ctrl')
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'addTreatmentCenter',
      url: '/add-treatment-center',
      component: '<add-treatment-center></add-treatment-center>'
    });
  }]);

module.exports = moduleName;
