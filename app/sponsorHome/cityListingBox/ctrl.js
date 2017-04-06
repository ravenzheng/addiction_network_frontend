module.exports = ['$log', '$stateParams', '$state', 'MapService', ctrl];

function ctrl($log, $stateParams, $state, service) {
  var vm = this;
  vm.$onInit = onInit;
  vm.goToCity = goToCity;

  function onInit() {
    vm.stateName = $stateParams.stateName;
    service.getCitiesByState(vm.stateName).then(function (result) {
      vm.cities = result;
      $log.info(result);
    }).catch(function (err) {
      $log.error(err);
    });
  }

  function goToCity(city) {
    $state.go('sponsorHome.city', {
      cityName: city
    });
  }
}
