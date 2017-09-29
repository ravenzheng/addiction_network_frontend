module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState) {
  var vm = this;
  vm.publish_ads2 = function () {
    $state.go(UIState.SIGN_UP.PUBLISH_ADS2);
  };
}
