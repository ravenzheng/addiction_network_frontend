var moduleName = 'app.sponsorHome';

require('./style.css');

angular.module(moduleName, [
  'ui.router',
  require('../components'),
  require('../services'),
  require('../sidePanel')
]).filter('urlFilter', require('./urlFilter'))
  .component('cityListBox', require('./cityListBox'))
  .component('cityListBoxOfCounty', require('./cityListBoxOfCounty'))
  .component('cityListBoxOfState', require('./cityListBoxOfState'))
  .component('countyListBox', require('./countyListBox'))
  .component('sponsorListingBox', require('./sponsorListingBox'))
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
      url: '/sponsorhome/{stateName:[a-zA-Z]{2}}/:countyName',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: 'sponsorHome.city',
      url: '/sponsorhome/{stateName:[a-zA-Z]{2}}/:cityName',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: 'sponsorHome.citiesOfState',
      url: '/sponsorhome/cities/{stateName:[a-zA-Z]{2}}',
      template: '<city-list-box-of-state></city-list-box-of-state>'
    });
    $stateProvider.state({
      name: 'sponsorHome.citiesOfCounty',
      url: '/sponsorhome/cities/{stateName:[a-zA-Z]{2}}/{countyName}',
      template: '<city-list-box-of-county></city-list-box-county>'
    });
  }]);

module.exports = moduleName;
