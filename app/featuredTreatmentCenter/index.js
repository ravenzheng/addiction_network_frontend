var angular = require('angular'),
  moduleName = 'app.featuredTreatmentCenter';

angular.module(moduleName, [
    'ngRoute',
    require('../sidePanel')
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/featured-treatment-center', {
      template: require('./view.html')
    });
  }])

module.exports = moduleName;
