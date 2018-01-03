module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState) {
  var vm = this;
  vm.viewProfile = function () {
    vm.resetRootVars();
    $state.go(UIState.LOGIN);
  };
  vm.close = function () {
    vm.resetRootVars();
    $state.go(UIState.HOME);
  };

  vm.resetRootVars = function () {
    $rootScope.activeCenter = null;
  };

}
