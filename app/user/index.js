var angular = require('angular'),
  moduleName = 'app.user';

angular.module(moduleName, [])
  .factory('UserService', require('./service'));

module.exports = moduleName
