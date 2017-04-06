var moduleName = 'app.home';

angular.module(moduleName, [
  'ui.router',
  require('../components'),
  require('../sidePanel')
]).factory('HomeListingService', require('./service'))
  .component('welcome', require('./welcome'))
  .component('featuredTreatmentCenter', require('./featuredTreatmentCenter'))
  .component('searchByState', require('./searchByState'))
  .component('home', {
    template: require('./view.html'),
    controller: require('./ctrl')
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'home',
      url: '/',
      template: '<home></home>'
    });
  }]);

module.exports = moduleName;
