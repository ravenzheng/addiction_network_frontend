var moduleName = 'app.aboutUs';

angular.module(moduleName, ['ui.router'])
  .component('about', {
    template: require('./view.html')
  })
  .controller('AboutUsCtrl', function ($scope, $location, $rootScope) {
    $scope.$on('$stateChangeSuccess', function changedPage() {
      $rootScope.title = 'About Us';
      $rootScope.description = 'About Us';
    });
    // });
  })
  .component('content', require('./content'))
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.ABOUT_US,
      url: '/about',
      template: '<about></about>'
    });
  }]);

module.exports = moduleName;
