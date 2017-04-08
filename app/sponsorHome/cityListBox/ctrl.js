module.exports = ['$log', '$stateParams', '$state', 'MapService', ctrl];

function ctrl($log, $stateParams, $state, service) {
  var vm = this;
  vm.$onInit = onInit;
  vm.goToCity = goToCity;

  function onInit() {
    vm.stateName = $stateParams.stateName;
    vm.countyName = $stateParams.countyName;
    service.getCitiesByCounty(vm.countyName).then(function (result) {
      if (!result.length) {
        throw new Error('Got an empty dataset at cityListBox');
      }
      result.sort();
      vm.cities = result;
      vm.displayError = false;
    }).catch(function (err) {
      $log.error(err);
      vm.displayError = true;
    });
  }

  function goToCity(city) {
    $state.go('sponsorHome.city', {
      stateName: vm.stateName,
      countyName: vm.countyName,
      cityName: city
    });
  }
}
