var angular = require('angular'),
  moduleName = 'app.myProfile';

angular.module(moduleName, [
  'ui.router',
  require('../components'),
  require('../services')
]).component('profileMain', require('./main'))

  .component('myProfile', {
    template: require('./view.html'),
    controller: require('./ctrl')
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'myProfile',
      url: '/my-profile',
      template: '<my-profile></my-profile>'
    });
  }]);

module.exports = moduleName;
