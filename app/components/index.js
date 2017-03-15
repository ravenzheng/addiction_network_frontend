var angular = require('angular'),
  moduleName = 'app.components';

angular.module(moduleName, [])
  .component('profileNavSection', require('./profileNavSection'))
  .directive('fileModel', require('./fileModel'));

module.exports = moduleName;
