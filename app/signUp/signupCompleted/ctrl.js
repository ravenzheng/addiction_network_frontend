module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'localStorageService', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, localStorageService) {
  var vm = this;
  vm.viewProfile = function () {
    vm.resetData();
    $state.go(UIState.LOGIN);
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
