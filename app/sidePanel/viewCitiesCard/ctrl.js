module.exports = ['$log', '$scope', '$state', '$stateParams', ctrl];

function ctrl($log, $scope, $state, $stateParams) {
  var vm = this;
  vm.$onInit = onInit;
  vm.goToCities = goToCities;

  var uiStatesToDiplsay = ['sponsorHome.county', 'sponsorHome.cities'];

  $scope.$on('$stateChangeStart', function (event, toState, toParams) {
    if (uiStatesToDiplsay.indexOf(toState.name) === -1) {
      vm.display = false;
      return;
    }
    vm.display = true;
    vm.stateName = toParams.stateName;
    vm.countyName = toParams.countyName;
  });

  function onInit() {
    if (uiStatesToDiplsay.indexOf($state.current.name) === -1) {
      vm.display = false;
      return;
    }
    vm.display = true;
    vm.stateName = $stateParams.stateName;
    vm.countyName = $stateParams.countyName;
  }

  // click to view All Cities of a county
  function goToCities() {
    $state.go('sponsorHome.cities', {
      countyName: vm.countyName,
      stateName: vm.stateName
    });
  }
}
