module.exports = ['$log', '$stateParams', '$state', 'MapService', ctrl];

function ctrl($log, $stateParams, $state, service) {
  var vm = this;
  vm.$onInit = onInit;
  vm.goToCounty = goToCounty;

  function onInit() {
    vm.stateName = $stateParams.stateName;
    service.getCountiesByState(vm.stateName).then(function (result) {
      if (!result.length) {
        throw new Error('Got an empty dataset at countyListBox.');
      }
      result.sort();
      vm.counties = result;
      vm.displayError = false;
    }).catch(function (err) {
      $log.error(err);
      vm.displayError = true;
    });
  }

  function goToCounty(county) {
    $state.go('sponsorHome.county', {
      stateName: vm.stateName,
      countyName: county
    });
  }
}
