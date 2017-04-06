var moduleName = 'app.sponsorHome';

angular.module(moduleName, [
  'ui.router',
  require('../services'),
  require('../sidePanel')
]).filter('urlFilter', require('./urlFilter'))
  .component('sponsorHome', {
    template: require('./view.html'),
    controller: require('./ctrl')
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'sponsorHome',
      url: '/sponsorhome/:slug',
      template: '<sponsor-home></sponsor-home>'
    });
  }]);

module.exports = moduleName;
