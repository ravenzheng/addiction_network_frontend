module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState) {
  var vm = this;
  vm.userCreate = function () {
    $state.go(UIState.SIGN_UP.USER_PROFILE);
  };
}
