module.exports = ['$log', '$scope', '$state', '$stateParams', ctrl];

function ctrl($log, $scope, $state, $stateParams) {
  var vm = this;
  vm.$onInit = onInit;
  vm.goToCounties = goToCounties;

  var uiStatesToDiplsay = ['sponsorHome.state', 'sponsorHome.counties'];

  $scope.$on('$stateChangeStart', function (event, toState, toParams) {
    if (uiStatesToDiplsay.indexOf(toState.name) === -1) {
      vm.display = false;
      return;
    }
    vm.display = true;
    vm.stateName = toParams.stateName;
  });

  function onInit() {
    if (uiStatesToDiplsay.indexOf($state.current.name) === -1) {
      vm.display = false;
      return;
    }
    vm.display = true;
    vm.stateName = $stateParams.stateName;
  }

  // view all counties of a state
  function goToCounties() {
    $state.go('sponsorHome.counties', {
      stateName: vm.stateName
    });
  }
}
