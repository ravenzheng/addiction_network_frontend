var angular = require('angular'),
  moduleName = 'app.treatmentCenterDetail';

angular.module(moduleName, [
    'ui.router',
    require('../services')
  ])
  .component('inquiryFormCard', require('./inquiryFormCard'))
  .component('treatmentCenterDetail', {
    template: require('./view.html'),
    controller: require('./ctrl')
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'treatmentCenterDetail',
      url: '/treatment-center-detail/:id',
      template: '<treatment-center-detail></treatment-center-detail>'
    });
  }]);

module.exports = moduleName;
