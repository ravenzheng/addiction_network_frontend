var moduleName = 'app.featuredTreatmentCenter';

angular.module(moduleName, [
  'ui.router',
  require('../sidePanel')
]).component('featuredTreatmentCenterPage', {
  template: require('./view.html')
}).config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
  $stateProvider.state({
    name: UIState.FEATURED_CENTER,
    url: '/featured-treatment-center',
    template: '<featured-treatment-center-page></featured-treatment-center-page>'
  });
}]);

module.exports = moduleName;
