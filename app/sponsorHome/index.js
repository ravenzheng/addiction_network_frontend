var moduleName = 'app.sponsorHome';

require('./style.css');

angular.module(moduleName, [
  'ui.router',
  require('../components'),
  require('../services'),
  require('../sidePanel')
]).filter('urlFilter', require('./urlFilter'))
  .component('sponsorListingBox', require('./sponsorListingBox'))
  .component('cityListBox', require('./cityListBox'))
  .component('countyListBox', require('./countyListBox'))
  .component('sponsorHome', {
    template: require('./view.html')
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'sponsorHome',
      abstract: true,
      template: '<sponsor-home></sponsor-home>'
    });
    $stateProvider.state({
      name: 'sponsorHome.filter',
      url: '/sponsorhome/filter/:filterName',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: 'sponsorHome.state',
      url: '/sponsorhome/state/:stateName',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: 'sponsorHome.counties',
      url: '/sponsorhome/counties/:stateName',
      template: '<county-list-box></county-list-box>'
    });
    $stateProvider.state({
      name: 'sponsorHome.county',
      url: '/sponsorhome/county/:stateName/:countyName',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: 'sponsorHome.city',
      url: '/sponsorhome/city/:stateName/:countyName/:cityName',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: 'sponsorHome.cities',
      url: '/sponsorhome/cities/:stateName/:countyName',
      template: '<city-list-box></city-list-box>'
    });
  }]);

module.exports = moduleName;
