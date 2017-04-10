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
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.INDEX,
      abstract: true,
      template: '<sponsor-home></sponsor-home>'
    });
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.FILTER,
      url: '/sponsorhome/filter/:filterName',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.STATE,
      url: '/sponsorhome/state/:stateName',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.COUNTIES,
      url: '/sponsorhome/counties/:stateName',
      template: '<county-list-box></county-list-box>'
    });
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.COUNTY,
      url: '/sponsorhome/county/:stateName/:countyName',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.CITY,
      url: '/sponsorhome/city/:stateName/:countyName/:cityName',
      template: '<sponsor-listing-box></sponsor-listing-box>'
    });
    $stateProvider.state({
      name: UIState.SPONSOR_HOME.CITIES,
      url: '/sponsorhome/cities/:stateName/:countyName',
      template: '<city-list-box></city-list-box>'
    });
  }]);

module.exports = moduleName;
