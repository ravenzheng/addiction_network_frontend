module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', ctrl];
function ctrl($injector, $scope, $log, $rootScope, $state, UIState) {
  var vm = this;
  vm.updateMembership = function () {
    $state.go(UIState.SIGN_UP.UPDATE_MEMBERSHIP);
  };
}
