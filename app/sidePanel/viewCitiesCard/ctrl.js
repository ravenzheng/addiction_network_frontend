module.exports = ['$log', '$scope', '$state', '$stateParams', ctrl];

function ctrl($log, $scope, $state, $stateParams) {
  var vm = this;
  vm.$onInit = onInit;
  vm.viewAllCities = viewAllCities;

  $scope.$on('$stateChangeStart', function (event, toState, toParams) {
    if (toState.name !== 'sponsorHome.state') {
      vm.display = false;
      return;
    }
    vm.display = true;
    $log.info(toParams);
    vm.stateName = toParams.stateName;
  });

  function onInit() {
    if (!$state.is('sponsorHome.state') && !$state.is('sponsorHome.cities')) {
      vm.display = false;
      return;
    }
    vm.display = true;
    $log.info($stateParams);
    vm.stateName = $stateParams.stateName;
  }

  // click View All Cities
  function viewAllCities() {
    $state.go('sponsorHome.cities', {
      stateName: vm.stateName
    });
  }
}
