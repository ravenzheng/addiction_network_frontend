var moduleName = 'app.addTreatmentCenterSignUp';

angular.module(moduleName, [
  'ui.router',
  require('../components'),
  require('../services')
])
  .component('contactInfo', require('./contactInfo'))
  .component('userInfo', require('./userInfo'))
  .component('centerInfo', require('./centerInfo'))
  .component('centerDetails', require('./centerDetails'))
  .component('formNavSection', require('./formNavSection'))
  .component('addListing', {
    template: require('./view.html'),
    controller: require('./ctrl')
  }).config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.ADD_LISTING.INDEX,
      url: '/add-listing',
      abstract: true,
      template: '<add-Listing></add-Listing>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.CONTACT_INFO,
      url: '/step1',
      template: '<contact-info></contact-info>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.USER_INFO,
      url: '/step2',
      template: '<user-info></user-info>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.CENTER_INFO,
      url: '/step3',
      template: '<center-info></center-info>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.CENTER_DETAILS,
      url: '/step4',
      template: '<center-details></center-details>'
    });
  }]);

module.exports = moduleName;
