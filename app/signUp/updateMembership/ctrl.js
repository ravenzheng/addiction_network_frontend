module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState) {
  var vm = this;
  vm.sponser = function () {
    $state.go(UIState.SIGN_UP.SPONSER);
  };
}
