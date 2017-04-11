module.exports = ['$log', '$stateParams', '$state', 'MapService', ctrl];

function ctrl($log, $stateParams, $state, service) {
  var vm = this;
  vm.$onInit = onInit;
  vm.goToCity = goToCity;

  function onInit() {
    // request cities of state. #/sponsorhome/cities/IL
    vm.stateName = $stateParams.stateName;
    vm.area = vm.stateName;
    service.getCitiesByState(vm.stateName).then(function (result) {
      if (!result.length) {
        throw new Error('Got an empty dataset at cityListBox');
      }
      result.sort();
      vm.cities = result;
    }).catch(function (err) {
      $log.error(err);
      vm.cities = [];
    });
  }

  function goToCity(city) {
    // todo
    $state.go('sponsorHome.city', {
      stateName: vm.stateName,
      countyName: vm.countyName,
      cityName: city
    });
  }
}
