function ctrl($log, $rootScope, Status, $window, localStorageService, $state, UIState, CartDetailService) {
  var vm = this;
  vm.$onInit = onInit;
  $rootScope.onInit = function () {
    onInit();
  };

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
    CartDetailService.getCartInfo(countyIdApi, cityIdsApi).then(function (result) {
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
      // collecting items data
      $rootScope.counties = result.counties;
      $rootScope.cities = result.cities;

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
        // if ($rootScope.demographicModel.indexOf($rootScope.demographic[key])) {}
        vm.demographic[key] = {
          'label': $rootScope.demographicModel[key].id,
          'price': 5
        };
        vm.demographicTotal += 5;
      }
      // Treatment Approach
      for (key in $rootScope.treatmentApproachModel) {
        vm.treatmentApproach[key] = {
          'label': $rootScope.treatmentApproachModel[key].id,
          'price': 5
        };
        vm.treatmentApproachTotal += 5;
      }
      // setting
      for (key in $rootScope.settingModel) {
        vm.setting[key] = {
          'label': $rootScope.settingModel[key].id,
          'price': 5
        };
        vm.settingTotal += 5;
      }
      // Additional services
      for (key in $rootScope.additionalServicesModel) {
        vm.additionalServices[key] = {
          'label': $rootScope.additionalServicesModel[key].id,
          'price': 5
        };
        vm.additionalServicesTotal += 5;
      }
      // Payment
      for (key in $rootScope.paymentModel) {
        vm.payment[key] = {
          'label': $rootScope.paymentModel[key].id,
          'price': 5
        };
        vm.paymentTotal += 5;
      }
      // Bydrug
      for (key in $rootScope.byDrugModel) {
        vm.byDrug[key] = {
          'label': $rootScope.byDrugModel[key].id,
          'price': 5
        };
        vm.byDrugTotal += 5;
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
    }).catch(function (err) {
      $log.error(err);
    });
    //  };
  }

  vm.deleteCartItem = function (key, item) {
    if (item === 'state') {
      vm.totalCost -= 15; // $rootScope.counties[key].price;
      vm.stateTotalCost -= 15;
      $rootScope.deletedStates.push($rootScope.statesDetail[key].state.toUpperCase());
      $rootScope.statesSel.splice(key, 1);
      $rootScope.statesDetail.splice(key, 1);
    } else if (item === 'county') {
      vm.totalCost -= $rootScope.counties[key].price;
      vm.countyTotalCost -= $rootScope.counties[key].price;
      var id = $rootScope.counties[key].id;
      for (var index in $rootScope.countyModel) {
        if ($rootScope.countyModel[index].id === id) {
          $rootScope.countyModel.splice(index, 1);
          break;
        }
      }
      $rootScope.counties.splice(key, 1);
    } else if (item === 'city') {
      vm.totalCost -= $rootScope.cities[key].price;
      vm.cityTotalCost -= $rootScope.cities[key].price;
      id = $rootScope.cities[key].id;
      for (index in $rootScope.cityModel) {
        if ($rootScope.cityModel[index].id === id) {
          $rootScope.cityModel.splice(index, 1);
          break;
        }
      }
      $rootScope.cities.splice(key, 1);
    } else if (item === 'demographic') {
      vm.totalCost -= 5;
      vm.demographicTotal -= 5;
      id = vm.demographic[key].id;
      for (index in $rootScope.demographicModel) {
        if ($rootScope.demographicModel[index].id === id) {
          $rootScope.demographicModel.splice(index, 1);
          break;
        }
      }
      vm.demographic.splice(key, 1);
    } else if (item === 'treatmentApproach') {
      vm.totalCost -= 5;
      vm.treatmentApproachTotal -= 5;
      id = vm.treatmentApproach[key].label;
      for (index in $rootScope.treatmentApproachModel) {
        if ($rootScope.treatmentApproachModel[index].id === id) {
          $rootScope.treatmentApproachModel.splice(index, 1);
          break;
        }
      }
      vm.treatmentApproach.splice(key, 1);
    } else if (item === 'setting') {
      vm.totalCost -= 5;
      vm.settingTotal -= 5;
      id = vm.setting[key].label;
      for (index in $rootScope.settingModel) {
        if ($rootScope.settingModel[index].id === id) {
          $rootScope.settingModel.splice(index, 1);
          break;
        }
      }
      vm.setting.splice(key, 1);
    } else if (item === 'additionalServices') {
      vm.totalCost -= 5;
      vm.additionalServicesTotal -= 5;
      id = vm.additionalServices[key].label;
      for (index in $rootScope.additionalServicesModel) {
        if ($rootScope.additionalServicesModel[index].id === id) {
          $rootScope.additionalServicesModel.splice(index, 1);
          break;
        }
      }
      vm.additionalServices.splice(key, 1);
    } else if (item === 'payment') {
      vm.totalCost -= 5;
      vm.paymentTotal -= 5;
      id = vm.payment[key].label;
      for (index in $rootScope.paymentModel) {
        if ($rootScope.paymentModel[index].id === id) {
          $rootScope.paymentModel.splice(index, 1);
          break;
        }
      }
      vm.payment.splice(key, 1);
    } else if (item === 'byDrug') {
      vm.totalCost -= 5;
      vm.byDrugTotal -= 5;
      id = vm.byDrug[key].label;
      for (index in $rootScope.byDrugModel) {
        if ($rootScope.byDrugModel[index].id === id) {
          $rootScope.byDrugModel.splice(index, 1);
          break;
        }
      }
      vm.byDrug.splice(key, 1);
    }

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
      localStorageService.set('addListingSponsoredPage', spnonsoredPage, 'sessionStorage');
    }
  };
  vm.continueShop = function () {
    $state.go(UIState.ADD_LISTING.SPONSORED_PAGES);
  };
}
module.exports = ['$log', '$rootScope', 'Status', '$window', 'localStorageService', '$state', 'UIState', 'CartDetailService', ctrl];
