module.exports = ['$log', '$state', 'UIState', 'MapService', 'TreatmentCenterService', ctrl];

function ctrl($log, $state, UIState, service, TreatmentCenterService) {
  var vm = this;
  vm.$onInit = onInit;
  vm.goToCity = goToCity;

  function onInit() {
    // request cities of state. #/sponsorhome/cities/IL
    vm.stateName = $state.params.stateName;
    vm.area = vm.stateName;
    service.getCitiesByState(vm.stateName).then(function (result) {
      result.sort();
      vm.cities = result;
      vm.displayError = (vm.cities.length === 0);
    }).catch(function (err) {
      $log.error(err);
      vm.cities = [];
      vm.displayError = true;
    });
  }

  /*
    [
      {
      county: countyName1,
      cities: [cityName1, cityName2, ...]
    }, {
      county: countyName2,
      cities: [cityName3, cityName4, ...]
    }
  ...
  ]
  */
  // flattem the result from server to a single city list
  //eslint-disable-next-line
  function flatten(citiesWithCounty) {
    var flattened = citiesWithCounty.reduce(function (accumulator, current) {
      return accumulator.concat(current.cities);
    }, []);
    return flattened;
  }

  // find county according to cityName
  //eslint-disable-next-line
  function findCountyName(cityName) {
    var entry = vm.citiesWithCounty.find(function (elem) {
      return elem.cities.find(function (city) {
        return city === cityName;
      });
    });
    return entry ? entry.county : null;
  }

  function goToCity(city) {
    // go to city from state page
    // todo. should get countyName from server first'
    TreatmentCenterService.querySponsoredListings(city).then(function (result) {
      if (!result.county) {
        return;
      }
      $state.go(UIState.SPONSOR_HOME.CITY, {
        stateName: vm.stateName,
        countyName: result.county,
        cityName: city
      });
    });
  }
}
