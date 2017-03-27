var angular = require('angular'),
  service = require('./service'),
  moduleName = 'app.addTreatmentCenterSignUp';

angular.module(moduleName, [
    'ui.router',
    require('../components')
  ])
  .factory('addTreatmentCenterSignUpService', require('./service'))
  .component('centerDetail', {
    template: require('./view.html'),
    controller: require('./ctrl')
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'centerDetail',
      url: '/center-detail',
      template: '<center-detail></center-detail>'
    });
  }]);

module.exports = moduleName;