var angular = require('angular'),
  moduleName = 'app.components';

angular.module(moduleName, [])
  .component('profileNavSection', require('./profileNavSection'))
  .component('stateSelect', require('./stateSelect'))
  .directive('fileModel', require('./fileModel'));

module.exports = moduleName;
