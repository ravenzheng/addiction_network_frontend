var moduleName = 'app.contactUs';

angular.module(moduleName, ['ui.router'])
  .component('contact', {
    template: require('./view.html')
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.CONTACT_US,
      url: '/contact',
      template: '<contact></contact>'
    });
  }]);

module.exports = moduleName;
