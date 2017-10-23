module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'SignUpService', 'localStorageService', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, service, localStorageService) {
  var vm = this;
  vm.testCenter = function () {
    $state.go(UIState.SIGN_UP.TEST_CENTER);
  };
  vm.grandTotal = 0;
  vm.membership = '';
  vm.centersAdded = localStorageService.get('center_added');
  if (localStorageService.get('membership') !== null) {
    vm.membership = localStorageService.get('membership');
    vm.grandTotal += vm.membership.cost;
  } else {
    vm.centersAdded = [];
  }
  for (var key in vm.centersAdded) {
    vm.grandTotal += vm.centersAdded[key].cost;
  }
  $log.info(vm.centersAdded);
  $log.info(vm.membership);
}
