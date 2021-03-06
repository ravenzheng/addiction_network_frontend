module.exports = ['$log', '$state', 'UIState', 'MapService', ctrl];

function ctrl($log, $state, UIState, service) {
  var vm = this;
  vm.$onInit = onInit;
  vm.goToCounty = goToCounty;

  function onInit() {
    vm.stateName = $state.params.stateName;
    service.getCountiesByState(vm.stateName).then(function (result) {
      result.sort();
      vm.counties = result;
      vm.displayError = false;
    }).catch(function (err) {
      $log.error(err);
      vm.counties = [];
      vm.displayError = true;
    });
  }

  function convertToSlug(Text) {
    return Text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  function goToCounty(county) {
    $state.go(UIState.SPONSOR_HOME.COUNTY, {
      stateName: convertToSlug(vm.stateName),
      countyName: convertToSlug(county)
    });
  }
}
