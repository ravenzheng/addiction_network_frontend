function ctrl($log, $rootScope, Status, $window, localStorageService, $state, UIState, CartDetailService) {
  var vm = this;
  vm.$onInit = onInit;
  if (angular.isUndefined($rootScope.deletedStates)) {
    $rootScope.deletedStates = [];
  }

  function onInit() {
    $rootScope.getCartDetails = function (countyIds, cityIds) {
      var cityIdsApi = [];
      var countyIdApi = [];
      var id = '';
      var i = 0;
      for (var key in countyIds) {
        id = String(countyIds[key].id);
        countyIdApi[i] = id;
        i++;
      }
      for (key in cityIds) {
        id = String(cityIds[key].id);
        cityIdsApi[i] = id;
        i++;
      }
      CartDetailService.getCartInfo(countyIdApi, cityIdsApi).then(function (result) {
        var totalCounty = 0;
        var totalStates = 0;
        var states = [];
        var statesDetail = [];
        var m = 0;

        for (var keyCon in result.counties) {
          var totalCounties = result.counties[keyCon].price;
          totalCounty += totalCounties;
          if (states.indexOf(result.counties[keyCon].state) === -1) {
            if ($rootScope.deletedStates.indexOf(result.counties[keyCon].state.toUpperCase()) === -1) {
              states[m] = result.counties[keyCon].state;
              statesDetail[m] = {
                state: result.counties[keyCon].state,
                state_name: result.counties[keyCon].state_name
              };
              totalStates += 15;
              m++;
            }
          }
        }

        var totalCity = 0;
        for (var k = 0; k < result.cities.length; k++) {
          if (angular.isUndefined(result.cities[k])) {
            // console.log('undefined: ' + k);
            continue;
          }
          var totalCities = result.cities[k].price;
          totalCity += totalCities;
          if (states.indexOf(result.cities[k].state) === -1) {
            if ($rootScope.deletedStates.indexOf(result.cities[k].state.toUpperCase()) === -1) {
              states[m] = result.cities[k].state;
              statesDetail[m] = {
                state: result.cities[k].state,
                state_name: result.cities[k].state_name
              };
              totalStates += 15;
              m++;
            }
          }
        }

        $rootScope.statesSel = states; // states
        $rootScope.statesDetail = statesDetail;

        var total = totalCounty + totalCity + totalStates;
        $rootScope.counties = result.counties;
        $rootScope.cities = result.cities;
        $rootScope.total = total;
      }).catch(function (err) {
        $log.error(err);
      });
    };
  }

  vm.deleteCartItem = function (key, item) {
    if (item === 'state') {
      $rootScope.total -= 15; // $rootScope.counties[key].price;
      $rootScope.deletedStates.push($rootScope.statesDetail[key].state.toUpperCase());
      $rootScope.statesSel.splice(key, 1);
      $rootScope.statesDetail.splice(key, 1);
    } else if (item === 'county') {
      $rootScope.total -= $rootScope.counties[key].price;
      var id = $rootScope.counties[key].id;
      for (var index in $rootScope.countyModel) {
        if ($rootScope.countyModel[index].id === id) {
          $rootScope.countyModel.splice(index, 1);
          break;
        }
      }
      $rootScope.counties.splice(key, 1);
    } else if (item === 'city') {
      $rootScope.total -= $rootScope.cities[key].price;
      id = $rootScope.cities[key].id;
      for (index in $rootScope.cityModel) {
        if ($rootScope.cityModel[index].id === id) {
          $rootScope.cityModel.splice(index, 1);
          break;
        }
      }
      $rootScope.cities.splice(key, 1);
    }
  };

  vm.continueShop = function () {
    $state.go(UIState.ADD_LISTING.SPONSORED_PAGES);
  };
}
module.exports = ['$log', '$rootScope', 'Status', '$window', 'localStorageService', '$state', 'UIState', 'CartDetailService', ctrl];
