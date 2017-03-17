var angular = require('angular'),
  moduleName = 'app.myProfile';

angular.module(moduleName, [
    'ngRoute',
    require('../user')
  ])
  .component('profileMain', require('./main'))
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/my-profile', {
      template: require('./view.html'),
      controller: 'ProfileCtrl'
    });
  }])
  .controller('ProfileCtrl', require('./ctrl'));

module.exports = moduleName;
