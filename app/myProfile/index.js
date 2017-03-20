var angular = require('angular'),
  moduleName = 'app.myProfile';

angular.module(moduleName, [
    'ngRoute',
    require('../components'),
    require('../services')
  ])
  .component('profileMain', require('./main'))
  .component('myProfile', {
    template: require('./view.html'),
    controller: require('./ctrl')
  })
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/my-profile', {
      template: '<my-profile></my-profile>'
    });
  }]);


module.exports = moduleName;
