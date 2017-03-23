var angular = require('angular'),
  moduleName = 'app.editTreatmentCenter';

angular.module(moduleName, [
    'ui.router',
    require('../components'),
    require('../services')
  ])
  .component('thumbnailDelete', require('./thumbnailDelete'))
  .component('editTreatmentCenterMain', require('./main'))
  .component('editTreatmentCenter', {
    template: require('./view.html'),
    controller: require('./ctrl')
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'editTreatmentCenter',
      url: '/edit-treatment-center/:id',
      template: '<edit-treatment-center></edit-treatment-center>',
    });
  }]);

module.exports = moduleName;
