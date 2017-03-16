var angular = require('angular'),
  moduleName = 'app.user';

angular.module(moduleName, [])
  .service('UserService', require('./service'));

module.exports = moduleName
