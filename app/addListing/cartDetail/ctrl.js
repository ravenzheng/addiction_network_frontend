function ctrl($log, $rootScope, Status, $window, localStorageService, $state, UIState, CartDetailService) {
  var vm = this;
  vm.$onInit = onInit;
  $rootScope.onInit = function () {
    onInit();
  };
  // onInit();
  if (angular.isUndefined($rootScope.deletedStates)) {
    $rootScope.deletedStates = [];
  }

  function onInit() {
    // get values from localStorageService
    if (angular.isDefined(localStorageService.get('addListingSponsoredPage', 'sessionStorage'))) {
      var sponsoredInfo = localStorageService.get('addListingSponsoredPage', 'sessionStorage');
      if (sponsoredInfo !== null) {
        $rootScope.cityModel = sponsoredInfo.cityModel;
        $rootScope.countyModel = sponsoredInfo.countyModel;
        $rootScope.deletedStates = sponsoredInfo.deletedStates;
        $rootScope.statesSel = sponsoredInfo.statesSel;
        $rootScope.statesDetail = sponsoredInfo.statesDetail;
      }
    }
    var countyIds = $rootScope.countyModel;
    var cityIds = $rootScope.cityModel;

    // $rootScope.getCartDetails = function (countyIds, cityIds) {
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

      if (angular.isDefined($rootScope.statesSel) && $rootScope.statesSel !== null) {
        states = $rootScope.statesSel;
        statesDetail = $rootScope.statesDetail;
        m = states.length;
      }

      for (key in states) {
        totalStates += 15;
      }

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
    //  };
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
    // saving to localStorageService
    var spnonsoredPage = {
      'cityModel': $rootScope.cityModel,
      'countyModel': $rootScope.countyModel,
      'deletedStates': $rootScope.deletedStates,
      'statesSel': $rootScope.statesSel,
      'statesDetail': $rootScope.statesDetail
    };
    if (localStorageService.isSupported) {
      localStorageService.set('addListingSponsoredPage', spnonsoredPage, 'sessionStorage');
    }
  };
  vm.continueShop = function () {
    $state.go(UIState.ADD_LISTING.SPONSORED_PAGES);
  };
}
module.exports = ['$log', '$rootScope', 'Status', '$window', 'localStorageService', '$state', 'UIState', 'CartDetailService', ctrl];
