module.exports = ['$document', '$rootScope', '$injector', '$state', 'UIState', 'SponsorService', 'localStorageService', 'Status', '$timeout', 'MapService', ctrl];
var slugs = require('./slug.json');

function ctrl($document, $rootScope, $injector, $state, UIState, service, localStorageService, Status, $timeout, mapService) {
  var vm = this;
  // initializing side cards values
  vm.multiselectModelSettings = {
    scrollableHeight: '200px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: false,
    checkBoxes: true
  };
  vm.demographic = {
    scrollableHeight: '195px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: false,
    checkBoxes: true
  };
  vm.settings = {
    scrollableHeight: '200px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: false,
    checkBoxes: true
  };
  vm.treatment = {
    scrollableHeight: '200px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: false,
    checkBoxes: true
  };
  vm.additional_services = {
    scrollableHeight: '200px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: false,
    checkBoxes: true
  };
  vm.stateSelectSetting = {
    scrollableHeight: '210px',
    showCheckAll: true,
    showUncheckAll: true,
    scrollable: true,
    enableSearch: false,
    checkBoxes: true
  };

  vm.buttonTxtDemographic = {
    buttonDefaultText: 'Demographic'
  };
  vm.buttonTxtTreatmentApproach = {
    buttonDefaultText: 'Treatment Approach'
  };
  vm.buttonTxtSetting = {
    buttonDefaultText: 'Setting'
  };
  vm.buttonTxtAdditionalServices = {
    buttonDefaultText: 'Additional Services'
  };
  vm.buttonTxtPayment = {
    buttonDefaultText: 'Payment'
  };
  vm.buttonTxtByDrug = {
    buttonDefaultText: 'By Drug'
  };

  $rootScope.demographic = [];
  $rootScope.treatmentApproach = [];
  $rootScope.setting = [];
  $rootScope.additionalServices = [];
  $rootScope.payment = [];
  $rootScope.byDrug = [];

  for (var slug in slugs.Demographic) {
    // console.log('slug: ' + slug + ' value: ' + slugs.Demographic[slug]);
    $rootScope.demographic[slug] = {
      id: slugs.Demographic[slug],
      label: slugs.Demographic[slug]
    };
  }

  for (slug in slugs.TreatmentApproach) {
    // console.log('slug: ' + slug + ' value: ' + slugs.TreatmentApproach[slug]);
    $rootScope.treatmentApproach[slug] = {
      id: slugs.TreatmentApproach[slug],
      label: slugs.TreatmentApproach[slug]
    };
  }

  for (slug in slugs.Setting) {
    $rootScope.setting[slug] = {
      id: slugs.Setting[slug],
      label: slugs.Setting[slug]
    };
  }

  for (slug in slugs.AdditionalServices) {
    $rootScope.additionalServices[slug] = {
      id: slugs.AdditionalServices[slug],
      label: slugs.AdditionalServices[slug]
    };
  }

  for (slug in slugs.Payment) {
    $rootScope.payment[slug] = {
      id: slugs.Payment[slug],
      label: slugs.Payment[slug]
    };
  }

  for (slug in slugs.ByDrug) {
    $rootScope.byDrug[slug] = {
      id: slugs.ByDrug[slug],
      label: slugs.ByDrug[slug]
    };
  }

  // vm.onStateSelect = function (state) {
  //   console.log('state: ' + state);
  //   // vm.open(state); // testing purpose
  //   if ($rootScope.treatmentCentersModel.length > 0) {
  //     vm.open(state);
  //   } else {
  //     $rootScope.$emit(Status.FAILED, 'Select any treatment center.');
  //     return;
  //   }
  // };
  $rootScope.countyText = {
    buttonDefaultText: 'Select County'
  };
  $rootScope.cityText = {
    buttonDefaultText: 'Select City'
  };
  $rootScope.stateSelectText = {
    buttonDefaultText: 'Select State'
  };

  // getting all states
  if (angular.isUndefined($rootScope.allStates) || $rootScope.allStates === null) {
    mapService.getStates().then(function (response) {
      var states = [];
      for (var key in response) {
        states[key] = {
          'id': response[key],
          'label': response[key]
        };
      }
      $rootScope.allStates = states;
    }).catch(function (err) {
      vm.error_message = err;
    });
  }

  // localStorageService.remove('myprofileSponsoredPage');
  // get values from localStorageService
  if (angular.isDefined(localStorageService.get('myprofileSponsoredPage', 'sessionStorage'))) {
    var sponsoredInfo = localStorageService.get('myprofileSponsoredPage', 'sessionStorage');
    if (sponsoredInfo !== null) {
      $rootScope.cityModel = sponsoredInfo.cityModel;
      $rootScope.countyModel = sponsoredInfo.countyModel;
      $rootScope.deletedStates = sponsoredInfo.deletedStates;
      $rootScope.statesSel = sponsoredInfo.statesSel;
      $rootScope.statesDetail = sponsoredInfo.statesDetail;
      $rootScope.demographicModel = sponsoredInfo.demographic;
      $rootScope.treatmentApproachModel = sponsoredInfo.treatmentApproach;
      $rootScope.settingModel = sponsoredInfo.setting;
      $rootScope.additionalServicesModel = sponsoredInfo.additionalServices;
      $rootScope.paymentModel = sponsoredInfo.payment;
      $rootScope.byDrugModel = sponsoredInfo.byDrug;
      if (sponsoredInfo.treatmentCenter) {
        $rootScope.centerSelected = sponsoredInfo.treatmentCenter;
        $rootScope.treatmentCentersModel = sponsoredInfo.treatmentCenter;
      }
      $rootScope.stateSelectModel = sponsoredInfo.stateSelectModel;
    }
  }

  vm.onStateSelect = function (state) {
    // vm.open(state); // testing purpose
    if ($rootScope.centerSelected.length > 0) {
      vm.open(state);
    } else {
      $rootScope.$emit(Status.FAILED, 'Select any treatment center.');
      return;
    }
  };
  if (angular.isUndefined($rootScope.stateSelectModel) || $rootScope.stateSelectModel === null) {
    $rootScope.stateSelectModel = [];
  }
  if (angular.isUndefined($rootScope.cityModel) || $rootScope.cityModel === null) {
    $rootScope.cityModel = [];
  }
  if (angular.isUndefined($rootScope.countyModel) || $rootScope.countyModel === null) {
    $rootScope.countyModel = [];
  }
  if (angular.isUndefined($rootScope.statesSel) || $rootScope.statesSel === null) {
    $rootScope.statesSel = [];
  }
  if (angular.isUndefined($rootScope.statesDetail) || $rootScope.statesDetail === null) {
    $rootScope.statesDetail = [];
  }
  if (angular.isUndefined($rootScope.deletedStates) || $rootScope.deletedStates === null) {
    $rootScope.deletedStates = [];
  }
  if (angular.isUndefined($rootScope.demographicModel) || $rootScope.demographicModel === null) {
    $rootScope.demographicModel = [];
  }
  if (angular.isUndefined($rootScope.treatmentApproachModel)) {
    $rootScope.treatmentApproachModel = [];
  }
  if (angular.isUndefined($rootScope.settingModel) || $rootScope.settingModel === null) {
    $rootScope.settingModel = [];
  }
  if (angular.isUndefined($rootScope.additionalServicesModel) || $rootScope.additionalServicesModel === null) {
    $rootScope.additionalServicesModel = [];
  }
  if (angular.isUndefined($rootScope.paymentModel) || $rootScope.paymentModel === null) {
    $rootScope.paymentModel = [];
  }
  if (angular.isUndefined($rootScope.byDrugModel) || $rootScope.byDrugModel === null) {
    $rootScope.byDrugModel = [];
  }

  vm.open = function (state) {
    vm.activeState = {
      id: state.id,
      name: state.fullname
    };
    // var stateMap = '<svg version="1.1" id="state_map" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewbox="' + state.viewbox + '" xml:space="preserve">  <g id="state">   <g> <path ng-attr-id="' + state.id + '" ng-attr-fill="' + state.upcolor + '" ng-attr-stroke="' + state.statestroke + '" ng-attr-d="' + state.d + '" stroke-width="1" cursor="pointer"></path></g></g><g id="abb"><text ng-attr-id="' + state.shortname + '" ng-attr-transform="' + state.transform + '" pointer-events="none"><tspan x="0" y="0" font-family="Arial" font-size="11" ng-attr-fill="' + state.namefill + '">' + state.shortname + '</tspan></text></g></svg>';
    // var stateMap = '<div id="googleMap" style="width:100%;height:400px;"></div><script>function myMap() {  var mapProp = {center: new google.maps.LatLng(' + state.latlong + '),zoom:' + state.zoomlevel + '};var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);}</script><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCzZiyHarHVkYQCBywa0HYl0MD77BRiL64&callback=myMap"></script>';
    var stateMap = '<img src="themes/addiction/images/' + state.image + '.png" style = "width:100%;opacity:0.2">';
    getCountyCity(vm, state, stateMap, service, $injector, $rootScope, localStorageService);
  };

  vm.citySelCount = 0;
  $rootScope.citySelectFun = function () {
    vm.citySelCount++;
  };

  $rootScope.deSelectCityFun = function () {
    vm.citySelCount--;
  };

  vm.countySelCount = 0;
  $rootScope.countySelectFun = function () {
    vm.countySelCount++;
  };

  $rootScope.deSelectCountyFun = function () {
    vm.countySelCount--;
  };

  vm.updateCart = function () {
    saveToLocalStorage($rootScope, localStorageService);
    $rootScope.onInit();
  };

  $timeout(function () {
    dropDownClickOnload($document);
  }, 500);
}

function getCountyCity(vm, state, stateMap, service, $injector, $rootScope, localStorageService) {
  if (angular.isUndefined($rootScope.cityModel) || $rootScope.cityModel === null) {
    $rootScope.cityModel = [];
  }
  if (angular.isUndefined($rootScope.countyModel) || $rootScope.countyModel === null) {
    $rootScope.countyModel = [];
  }
  if (angular.isUndefined($rootScope.statesSel) || $rootScope.statesSel === null) {
    $rootScope.statesSel = [];
  }
  if (angular.isUndefined($rootScope.statesDetail) || $rootScope.statesDetail === null) {
    $rootScope.statesDetail = [];
  }
  if (angular.isUndefined($rootScope.deletedStates) || $rootScope.deletedStates === null) {
    $rootScope.deletedStates = [];
  }
  service.getCityCountyByStateV2(state.shortname).then(function (response) {
    var i = 0;
    var modifiedCitySelect = [];
    var modifiedCountySelect = [];
    for (var key in response.city) {
      modifiedCitySelect[i] = {
        id: response.city[key].id,
        label: response.city[key].name
      };
      var cityLength = response.city.length;
      i++;
    }
    var totalCityHeight = 20 * cityLength + 100;
    if (totalCityHeight > 700) {
      totalCityHeight = 550;
    }
    for (key in response.county) {
      modifiedCountySelect[i] = {
        id: response.county[key].id,
        label: response.county[key].name
      };
      var countyLength = response.county.length;
      i++;
    }
    var totalCountyHeight = 20 * countyLength + 110;
    if (totalCountyHeight > 700) {
      totalCountyHeight = 550;
    }
    if (countyLength > 14) {
      var widthCounty = 'two_columns county_negative_two';
      var scrollableHeightCounty = 'auto';
    }
    if (countyLength > 42) {
      widthCounty = 'three_columns';
      scrollableHeightCounty = 'auto';
    }
    if (countyLength > 56) {
      widthCounty = 'four_columns county_negative_four';
      scrollableHeightCounty = 'auto';
    }
    if (countyLength > 70) {
      widthCounty = 'five_columns county_negative';
      scrollableHeightCounty = 'auto';
    }
    if (countyLength > 84) {
      widthCounty = 'six_columns county_negative_six';
      scrollableHeightCounty = 'auto';
    }
    if (countyLength > 100) {
      widthCounty = 'seven_columns';
      scrollableHeightCounty = totalCountyHeight + 'px';
    }
    if (cityLength > 14) {
      var widthCity = 'two_columns negative_margin';
      var scrollableHeightCity = 'auto';
    }
    if (cityLength > 42) {
      widthCity = 'three_columns negative_margin';
      scrollableHeightCity = 'auto';
    }
    if (cityLength > 56) {
      widthCity = 'four_columns negative_margin';
      scrollableHeightCity = 'auto';
    }
    if (cityLength > 70) {
      widthCity = 'five_columns negative_margin';
      scrollableHeightCity = 'auto';
    }
    if (cityLength > 84) {
      widthCity = 'six_columns negative_margin';
      scrollableHeightCity = totalCityHeight + 'px';
    }
    if (cityLength > 88) {
      widthCity = 'six_and_last_columns negative_margin';
      scrollableHeightCity = totalCityHeight + 'px';
    }
    if (cityLength > 100) {
      widthCity = 'seven_columns negative_margin';
      scrollableHeightCity = totalCityHeight + 'px';
    }
    $rootScope.multiselectModelSettingsCounty = {
      scrollableHeight: scrollableHeightCounty,
      // scrollableHeight: 'auto',
      scrollable: true,
      checkBoxes: true,
      showCheckAll: true,
      showUncheckAll: true,
      // enableSearch: true,
      required: true,
      keyboardControls: true
    };
    $rootScope.multiselectModelSettingsCity = {
      scrollableHeight: scrollableHeightCity,
      // scrollableHeight: 'auto',
      scrollable: true,
      checkBoxes: true,
      showCheckAll: true,
      showUncheckAll: true,
      // enableSearch: true,
      required: true,
      keyboardControls: true
    };
    $rootScope.width = 'three_columns';
    $rootScope.city = modifiedCitySelect;
    $rootScope.county = modifiedCountySelect;
    var citySelect = '<div class="' + widthCity + '" ng-dropdown-multiselect=""  options="$root.city" checkboxes="true" selected-model="$root.cityModel" extra-settings="$root.multiselectModelSettingsCity" translation-texts="$root.cityText" events="{ onSelectAll: onSelectAllCity, onItemSelect: citySelectFun, onItemDeselect: deSelectCityFun}" ></div>';
    var countySelect = '<div class="' + widthCounty + '" ng-dropdown-multiselect=""  options="$root.county" checkboxes="true" selected-model="$root.countyModel" extra-settings="$root.multiselectModelSettingsCounty" translation-texts="$root.countyText" events="{ onSelectAll: onSelectAllCounty, onItemSelect: countySelectFun, onItemDeSelect: deSelectCountyFun }"></div>';

    // var displayStateMap = '<div class="col-sm-12"><div class="modal-header header_state_map"><div class="col-sm-4">' + countySelect + '</div><div class="col-sm-4 text-center"><h3 class="modal-title" id="modal-title">' + state.fullname + '</h3></div><div class="col-sm-4 text-right">' + citySelect + '</div></div></div></div></div><div class="modal-body map_body_state" id="modal-body"><div class="col-md-12 col-sm-12 col-xs-12 col-lg-12 ">' + stateMap + '</div></div><div class="modal-footer map_popup_footer"><div style="position: absolute;top: 10px;text-align: right;width: 95%;cursor: pointer;border-radius: 100%;" ng-click="cancel()"><i class="fa fa-window-close fa-1" aria-hidden="true" style="position: absolute;top: 0px; font-size: 24px;border-radius: 100%;"></i></div>';

    var displayStateMap = '<div class="col-sm-12"><div class="modal-header header_state_map"><div class="col-sm-5 text-right">' + countySelect + '</div><div class="col-sm-3 text-center"><h3 class="modal-title" id="modal-title">' + state.fullname + '</h3></div><div class="col-sm-4 text-left">' + citySelect + '</div></div></div></div></div><div class="modal-body map_body_state" id="modal-body"><div class="col-md-12 col-sm-12 col-xs-12 col-lg-12 ">' + stateMap + '</div></div><div class="modal-footer map_popup_footer"><div class="col-sm-7 checkbox_checked">Select State &nbsp;<input type ="checkbox"></div><div class="col-sm-5"><button type="button" class="btn btn-primary" ng-click="ok()">Done</button></div><div ng-click="cancel()"><i class="fa fa-times fa-1" aria-hidden="true" style="position: absolute;top: 0px; font-size: 24px;border-radius: 100%; margin-left:-10px;cursor: pointer;"></i></div>';

    var modalInstance = $injector.get('$uibModal').open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      size: 'lg',
      template: displayStateMap,
      controller: function () {
        $rootScope.ok = function () {
          if (vm.citySelCount > 0) {
            if (angular.isUndefined($rootScope.deletedStates[0])) {
              modalInstance.dismiss('cancel');
              saveToLocalStorage($rootScope, localStorageService);
              $rootScope.onInit();
              return true;
            }
            if ($rootScope.deletedStates.indexOf(vm.activeState.name.toUpperCase()) >= 0) {
              $rootScope.deletedStates.splice($rootScope.deletedStates.indexOf(vm.activeState.name.toUpperCase()), 1);
            }
          }
          if (vm.countySelCount > 0) {
            if (angular.isUndefined($rootScope.deletedStates[0])) {
              modalInstance.dismiss('cancel');
              saveToLocalStorage($rootScope, localStorageService);
              $rootScope.onInit();
              return true;
            }
            if ($rootScope.deletedStates.indexOf(vm.activeState.name.toLowerCase()) >= 0) {
              $rootScope.deletedStates.splice($rootScope.deletedStates.indexOf(vm.activeState.name.toLowerCase()), 1);
            }
          }
          // save to localStorageService
          saveToLocalStorage($rootScope, localStorageService);
          $rootScope.onInit();
          modalInstance.dismiss('cancel');
          return true;
        };
        $rootScope.cancel = function () {
          if (vm.citySelCount > 0) {
            if (angular.isDefined($rootScope.deletedStates)) {
              if (angular.isUndefined($rootScope.deletedStates[0])) {
                saveToLocalStorage($rootScope, localStorageService);
                $rootScope.onInit();
                modalInstance.dismiss('cancel');
                return true;
              }

              if ($rootScope.deletedStates.indexOf(vm.activeState.name.toUpperCase()) >= 0) {
                $rootScope.deletedStates.splice($rootScope.deletedStates.indexOf(vm.activeState.name.toUpperCase()), 1);
              }
            }
          }
          if (vm.countySelCount > 0) {
            if (angular.isDefined($rootScope.deletedStates)) {
              if (angular.isUndefined($rootScope.deletedStates[0])) {
                saveToLocalStorage($rootScope, localStorageService);
                $rootScope.onInit();
                modalInstance.dismiss('cancel');
                return true;
              }
              if ($rootScope.deletedStates.indexOf(vm.activeState.name.toLowerCase()) >= 0) {
                $rootScope.deletedStates.splice($rootScope.deletedStates.indexOf(vm.activeState.name.toLowerCase()), 1);
              }
            }
          }
          // save to localStorageService
          saveToLocalStorage($rootScope, localStorageService);
          $rootScope.onInit();
          modalInstance.dismiss('cancel');
          return true;
        };
        $rootScope.onSelectAllCity = function () {

        };
        $rootScope.onSelectAllCounty = function () {};
      },
      bindToController: true
    });
  });
}

function dropDownClickOnload($document) {
  angular.element(function () {
    var demographic = angular.element($document[0].querySelector('#demographic .dropdown-toggle'));
    var treatment = angular.element($document[0].querySelector('#treatmentApproach .dropdown-toggle'));
    var setting = angular.element($document[0].querySelector('#setting .dropdown-toggle'));
    var additionalServices = angular.element($document[0].querySelector('#additionalServices .dropdown-toggle'));
    var payment = angular.element($document[0].querySelector('#payment .dropdown-toggle'));
    var byDrug = angular.element($document[0].querySelector('#byDrug .dropdown-toggle'));
    var statesSelect = angular.element($document[0].querySelector('#statesSelect .dropdown-toggle'));

    if (angular.isDefined(demographic[0])) {
      // elem[0].disabled = true;
      // elem[0].clicked = true;
      demographic[0].click();
    }
    if (angular.isDefined(treatment[0])) {
      treatment[0].click();
    }
    if (angular.isDefined(setting[0])) {
      setting[0].click();
    }
    if (angular.isDefined(additionalServices[0])) {
      additionalServices[0].click();
    }
    if (angular.isDefined(payment[0])) {
      payment[0].click();
    }
    if (angular.isDefined(byDrug[0])) {
      byDrug[0].click();
    }
    if (angular.isDefined(byDrug[0])) {
      statesSelect[0].click();
    }
  });
}

// saving to localStorageService
function saveToLocalStorage($rootScope, localStorageService) {
  var sponsor = {
    'cityModel': $rootScope.cityModel,
    'countyModel': $rootScope.countyModel,
    'deletedStates': $rootScope.deletedStates,
    'stateSel': $rootScope.statesSel,
    'statesDetail': $rootScope.statesDetail,
    'treatmentCenter': $rootScope.treatmentCentersModel,
    'demographic': $rootScope.demographicModel,
    'treatmentApproach': $rootScope.treatmentApproachModel,
    'setting': $rootScope.settingModel,
    'additionalServices': $rootScope.additionalServicesModel,
    'payment': $rootScope.paymentModel,
    'byDrug': $rootScope.byDrugModel,
    'centersValue': $rootScope.treatmentCentersValue,
    'stateSelectModel': $rootScope.stateSelectModel
  };
  if (localStorageService.isSupported) {
    localStorageService.set('myprofileSponsoredPage', sponsor, 'sessionStorage');
  }
}