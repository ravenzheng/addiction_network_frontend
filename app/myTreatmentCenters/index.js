var angular = require('angular'),
  moduleName = 'app.myTreatmentCenters';

angular.module(moduleName, [
    'ui.router',
    require('../services')
  ])
  .component('centerTable', require('./centerTable'))
  .component('pagination', require('./pagination'))
  .component('centersMain', require('./main'))
  .component('myTreatmentCenters', {
    template: require('./view.html')
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'myTreatmentCenters',
      url: '/my-treatment-centers',
      template: '<my-treatment-centers></my-treatment-centers>'
    });
  }])

module.exports = moduleName;
