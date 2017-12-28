module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'localStorageService', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, localStorageService) {
  var vm = this;
  vm.viewCenterDetails = function () {
    vm.resetData();
    $rootScope.addCenterInitialize = 0; // show left panel navigations
    $state.go(UIState.MY_PROFILE.TEST_CENTER_DETAILS);
  };
  vm.close = function () {
    vm.resetData();
    $state.go(UIState.HOME);
  };
  vm.resetData = function () {
    $rootScope.activeCenter = null;
    localStorageService.remove('signupStepsData', 'sessionStorage', 'signupToken');
  };
}
