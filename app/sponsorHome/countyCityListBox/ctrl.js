module.exports = ['$log', '$stateParams', '$state', 'MapService', ctrl];

function ctrl($log, $stateParams, $state, service) {
  var vm = this;
  vm.$onInit = onInit;
  vm.goToCity = goToCity;

  function onInit() {
    var area = $stateParams.countyName;
    $log.info(area);
    if (area.indexOf('-') === -1) {
      // invalid $stateParams, go back to home.
      $state.go('home');
      return;
    }
    // request cities of state. #/sponsorhome/cities/Cook-IL
    var segs = area.split('-');
    vm.countyName = segs[0];
    vm.stateName = segs[1];
    vm.area = segs[0];
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
