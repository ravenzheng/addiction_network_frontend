var angular = require('angular'),
  appName = 'AddictionNetworkApp';

angular.module(appName, [
  require('./home/'),
  require('./sidePanel'),
  require('./sponsoredListing')
]).constant('endPoint', require('./endPoint'));

angular.bootstrap(document.getElementsByTagName('body')[0], [appName]);
