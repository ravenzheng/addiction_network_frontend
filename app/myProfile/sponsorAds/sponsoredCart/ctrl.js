function ctrl($log, $rootScope, Status, $window, localStorageService, $state, UIState, CartDetailService) {
  var vm = this;
  vm.$onInit = onInit;
  $rootScope.onInit = function () {
    onInit();
  };

  function onInit() {
    // get values from localStorageService
    if (angular.isDefined(localStorageService.get('myprofileSponsoredPage', 'sessionStorage'))) {
      var sponsoredInfo = localStorageService.get('myprofileSponsoredPage', 'sessionStorage');
      if (sponsoredInfo !== null) {
        $rootScope.cityModel = sponsoredInfo.cityModel;
        $rootScope.countyModel = sponsoredInfo.countyModel;
        $rootScope.deletedStates = sponsoredInfo.deletedStates;
        $rootScope.statesSel = sponsoredInfo.statesSel;
        $rootScope.statesDetail = sponsoredInfo.statesDetail;
        $rootScope.treatmentCentersValue = sponsoredInfo.centersValue;
      }
    }
    if (angular.isUndefined($rootScope.deletedStates)) {
      $rootScope.deletedStates = [];
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

    vm.priceState = 0;
    vm.priceCounty = 0;
    vm.priceCity = 0;

    // get price info
    CartDetailService.getPriceInfo().then(function (response) {
      vm.priceState = response.price_state;
      vm.priceCounty = response.price_county;
      vm.priceCity = response.price_city;

      CartDetailService.getCartInfo(countyIdApi, cityIdsApi).then(function (result) {
        cartInfo(result);
      }).catch(function (err) {
        $log.error(err);
      });
    });

    function cartInfo(result) {
      vm.stateTotalCost = 0;
      vm.cityTotalCost = 0;
      vm.countyTotalCost = 0;
      vm.demographicTotal = 0;
      vm.treatmentApproachTotal = 0;
      vm.settingTotal = 0;
      vm.additionalServicesTotal = 0;
      vm.paymentTotal = 0;
      vm.byDrugTotal = 0;
      vm.totalCost = 0;

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
        // totalStates += 15;
        totalStates += vm.priceState;
      }

      for (var keyCon in result.counties) {
        // var totalCounties = result.counties[keyCon].price;
        totalCounty += vm.priceCounty;
        if (states.indexOf(result.counties[keyCon].state) === -1) {
          if ($rootScope.deletedStates.indexOf(result.counties[keyCon].state.toUpperCase()) === -1) {
            states[m] = result.counties[keyCon].state;
            statesDetail[m] = {
              state: result.counties[keyCon].state,
              state_name: result.counties[keyCon].state_name
            };
            //  totalStates += 15;
            totalStates += vm.priceState;
            m++;
          }
        }
      }

      var totalCity = 0;
      for (var k = 0; k < result.cities.length; k++) {
        if (angular.isUndefined(result.cities[k])) {
          //  console.log('undefined: ' + k);
          continue;
        }
        // var totalCities = result.cities[k].price;
        // var totalCities = 10;
        totalCity += vm.priceCity;
        if (states.indexOf(result.cities[k].state) === -1) {
          if ($rootScope.deletedStates.indexOf(result.cities[k].state.toUpperCase()) === -1) {
            states[m] = result.cities[k].state;
            statesDetail[m] = {
              state: result.cities[k].state,
              state_name: result.cities[k].state_name
            };
            totalStates += vm.priceState;
            m++;
          }
        }
      }
      // collecting items data
      $rootScope.counties = result.counties;
      $rootScope.cities = result.cities;
      // getting states from separate dropdown
      if (angular.isDefined($rootScope.stateSelectModel) && $rootScope.stateSelectModel.length > 0) {
        // states = [];
        // statesDetail = [];
        // totalStates = 0;
        i = states.length;
        var stateModel = $rootScope.stateSelectModel;
        // var newStateSelectModel = $rootScope.stateSelectModel;
        for (key in stateModel) {
          if (states.indexOf(stateModel[key].id) >= 0) {
            continue;
          }
          states[i] = stateModel[key].id;
          statesDetail[i] = {
            state: stateModel[key].id,
            state_name: stateModel[key].id
          };
          i++;
          totalStates += vm.priceState;
        }
      }

      $rootScope.statesSel = states; // states
      $rootScope.statesDetail = statesDetail;

      vm.treatmentCenters = [];
      vm.demographic = [];
      vm.treatmentApproach = [];
      vm.setting = [];
      vm.additionalServices = [];
      vm.payment = [];
      vm.byDrug = [];

      // Demographic
      for (key in $rootScope.demographicModel) {
        //  console.log('kfhdskj: ' + $rootScope.demographicModel.indexOf($rootScope.demographic[key]));
        vm.demographic[key] = {
          'label': $rootScope.demographicModel[key].id,
          'price': 5
        };
        vm.demographicTotal += 300;
      }
      // Treatment Approach
      for (key in $rootScope.treatmentApproachModel) {
        vm.treatmentApproach[key] = {
          'label': $rootScope.treatmentApproachModel[key].id,
          'price': 300
        };
        vm.treatmentApproachTotal += 300;
      }
      // setting
      for (key in $rootScope.settingModel) {
        vm.setting[key] = {
          'label': $rootScope.settingModel[key].id,
          'price': 300
        };
        vm.settingTotal += 300;
      }
      // Additional services
      for (key in $rootScope.additionalServicesModel) {
        vm.additionalServices[key] = {
          'label': $rootScope.additionalServicesModel[key].id,
          'price': 5
        };
        vm.additionalServicesTotal += 300;
      }
      // Payment
      for (key in $rootScope.paymentModel) {
        vm.payment[key] = {
          'label': $rootScope.paymentModel[key].id,
          'price': 300
        };
        vm.paymentTotal += 300;
      }
      // Bydrug
      for (key in $rootScope.byDrugModel) {
        vm.byDrug[key] = {
          'label': $rootScope.byDrugModel[key].id,
          'price': 300
        };
        vm.byDrugTotal += 300;
      }
      // treatment centers
      for (key in $rootScope.centerSelected) {
        for (var val in $rootScope.treatmentCentersValue) {
          if ($rootScope.centerSelected[key].id === $rootScope.treatmentCentersValue[val].id) {
            vm.treatmentCenters[key] = {
              id: $rootScope.centerSelected[key].id,
              label: $rootScope.treatmentCentersValue[val].label
            };
          }
        }
      }
      vm.stateTotalCost = totalStates;
      vm.cityTotalCost = totalCity;
      vm.countyTotalCost = totalCounty;
      var total = totalCounty + totalCity + totalStates + vm.demographicTotal + vm.treatmentApproachTotal + vm.settingTotal + vm.additionalServicesTotal + vm.paymentTotal + vm.byDrugTotal;
      vm.totalCost = total;
      $rootScope.total = total;
    }
  }

  vm.deleteCartItem = function (key, item) {
    if (item === 'state') {
      vm.totalCost -= vm.priceState; // $rootScope.counties[key].price;
      vm.stateTotalCost -= vm.priceState;
      $rootScope.deletedStates.push($rootScope.statesDetail[key].state.toUpperCase());
      $rootScope.statesSel.splice(key, 1);
      $rootScope.statesDetail.splice(key, 1);
    } else if (item === 'county') {
      vm.totalCost -= vm.priceCounty;
      vm.countyTotalCost -= vm.priceCounty;
      var id = $rootScope.counties[key].id;
      for (var index in $rootScope.countyModel) {
        if ($rootScope.countyModel[index].id === id) {
          $rootScope.countyModel.splice(index, 1);
          break;
        }
      }
      $rootScope.counties.splice(key, 1);
    } else if (item === 'city') {
      vm.totalCost -= vm.priceCity;
      vm.cityTotalCost -= vm.priceCity;
      id = $rootScope.cities[key].id;
      for (index in $rootScope.cityModel) {
        if ($rootScope.cityModel[index].id === id) {
          $rootScope.cityModel.splice(index, 1);
          break;
        }
      }
      $rootScope.cities.splice(key, 1);
    } else if (item === 'demographic') {
      vm.totalCost -= 300;
      vm.demographicTotal -= 300;
      id = vm.demographic[key].id;
      for (index in $rootScope.demographicModel) {
        if ($rootScope.demographicModel[index].id === id) {
          $rootScope.demographicModel.splice(index, 1);
          break;
        }
      }
      vm.demographic.splice(key, 1);
    } else if (item === 'treatmentApproach') {
      vm.totalCost -= 300;
      vm.treatmentApproachTotal -= 300;
      id = vm.treatmentApproach[key].label;
      for (index in $rootScope.treatmentApproachModel) {
        if ($rootScope.treatmentApproachModel[index].id === id) {
          $rootScope.treatmentApproachModel.splice(index, 1);
          break;
        }
      }
      vm.treatmentApproach.splice(key, 1);
    } else if (item === 'setting') {
      vm.totalCost -= 300;
      vm.settingTotal -= 300;
      id = vm.setting[key].label;
      for (index in $rootScope.settingModel) {
        if ($rootScope.settingModel[index].id === id) {
          $rootScope.settingModel.splice(index, 1);
          break;
        }
      }
      vm.setting.splice(key, 1);
    } else if (item === 'additionalServices') {
      vm.totalCost -= 300;
      vm.additionalServicesTotal -= 300;
      id = vm.additionalServices[key].label;
      for (index in $rootScope.additionalServicesModel) {
        if ($rootScope.additionalServicesModel[index].id === id) {
          $rootScope.additionalServicesModel.splice(index, 1);
          break;
        }
      }
      vm.additionalServices.splice(key, 1);
    } else if (item === 'payment') {
      vm.totalCost -= 300;
      vm.paymentTotal -= 300;
      id = vm.payment[key].label;
      for (index in $rootScope.paymentModel) {
        if ($rootScope.paymentModel[index].id === id) {
          $rootScope.paymentModel.splice(index, 1);
          break;
        }
      }
      vm.payment.splice(key, 1);
    } else if (item === 'byDrug') {
      vm.totalCost -= 300;
      vm.byDrugTotal -= 300;
      id = vm.byDrug[key].label;
      for (index in $rootScope.byDrugModel) {
        if ($rootScope.byDrugModel[index].id === id) {
          $rootScope.byDrugModel.splice(index, 1);
          break;
        }
      }
      vm.byDrug.splice(key, 1);
    }

    $rootScope.total = vm.totalCost;

    // saving to localStorageService
    var spnonsoredPage = {
      'cityModel': $rootScope.cityModel,
      'countyModel': $rootScope.countyModel,
      'deletedStates': $rootScope.deletedStates,
      'statesSel': $rootScope.statesSel,
      'statesDetail': $rootScope.statesDetail,
      'demographic': $rootScope.demographicModel,
      'treatmentApproach': $rootScope.treatmentApproachModel,
      'setting': $rootScope.settingModel,
      'additionalServices': $rootScope.additionalServicesModel,
      'payment': $rootScope.paymentModel,
      'byDrug': $rootScope.byDrugModel
    };
    if (localStorageService.isSupported) {
      localStorageService.set('myprofileSponsoredPage', spnonsoredPage, 'sessionStorage');
    }
  };
  vm.continueShop = function () {
    $state.go(UIState.ADD_LISTING.SPONSORED_PAGES);
  };
}
module.exports = ['$log', '$rootScope', 'Status', '$window', 'localStorageService', '$state', 'UIState', 'CartDetailService', ctrl];
