module.exports = ['$rootScope', '$injector', '$state', 'UIState', 'SponsorService', 'localStorageService', ctrl];

function ctrl($rootScope, $injector, $state, UIState, service, localStorageService) {
  var vm = this;
  vm.onStateSelect = function (state) {
    // $state.go(UIState.SPONSOR_HOME.STATE, {
    //   stateName: state.shortname
    // });
    // console.log('state: ' + state.fullname);

    if ($rootScope.centerSelected.length > 0) {
      vm.open(state);
    }
  };
  $rootScope.countyText = {
    buttonDefaultText: 'Select County'
  };
  $rootScope.cityText = {
    buttonDefaultText: 'Select City'
  };
  // get values from localStorageService
  if (angular.isDefined(localStorageService.get('addListingSponsoredPage', 'sessionStorage'))) {
    var sponsoredInfo = localStorageService.get('addListingSponsoredPage', 'sessionStorage');
    if (sponsoredInfo !== null) {
      $rootScope.cityModel = sponsoredInfo.cityModel;
      $rootScope.countyModel = sponsoredInfo.countyModel;
      $rootScope.deletedStates = sponsoredInfo.deletedStates;
      $rootScope.statesSel = sponsoredInfo.statesSel;
      $rootScope.statesDetail = sponsoredInfo.statesDetail;
      if (sponsoredInfo.treatmentCenter) {
        $rootScope.centerSelected = sponsoredInfo.treatmentCenter;
        $rootScope.treatmentCentersModel = sponsoredInfo.treatmentCenter;
      }
    }
  }

  if (angular.isUndefined($rootScope.cityModel)) {
    $rootScope.cityModel = [];
  }
  if (angular.isUndefined($rootScope.countyModel)) {
    $rootScope.countyModel = [];
  }
  if (angular.isUndefined($rootScope.statesSel)) {
    $rootScope.statesSel = [];
  }
  if (angular.isUndefined($rootScope.statesDetail)) {
    $rootScope.statesDetail = [];
  }
  if (angular.isUndefined($rootScope.deletedStates)) {
    $rootScope.deletedStates = [];
  }
  var token = localStorageService.get('signupToken');

  vm.open = function (state) {
    vm.activeState = {
      id: state.id,
      name: state.fullname
    };

    // var stateMap = '<svg version="1.1" id="state_map" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewbox="' + state.viewbox + '" xml:space="preserve">  <g id="state">   <g> <path ng-attr-id="' + state.id + '" ng-attr-fill="' + state.upcolor + '" ng-attr-stroke="' + state.statestroke + '" ng-attr-d="' + state.d + '" stroke-width="1" cursor="pointer"></path></g></g><g id="abb"><text ng-attr-id="' + state.shortname + '" ng-attr-transform="' + state.transform + '" pointer-events="none"><tspan x="0" y="0" font-family="Arial" font-size="11" ng-attr-fill="' + state.namefill + '">' + state.shortname + '</tspan></text></g></svg>';
    // var stateMap = '<div id="googleMap" style="width:100%;height:400px;"></div><script>function myMap() {  var mapProp = {center: new google.maps.LatLng(' + state.latlong + '),zoom:' + state.zoomlevel + '};var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);}</script><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCzZiyHarHVkYQCBywa0HYl0MD77BRiL64&callback=myMap"></script>';
    var stateMap = '<img src="themes/addiction/images/' + state.image + '.png" style = "width:100%;opacity:0.2">';
    getCountyCity(vm, state, stateMap, token, service, $injector, $rootScope, localStorageService);
  };

  vm.citySelCount = 0;
  $rootScope.citySelectFun = function () {
    // saving to localStorageService
    // var spnonsoredPage = {
    //   'cityModel': $rootScope.cityModel,
    //   'countyModel': $rootScope.countyModel,
    //   'deletedStates': $rootScope.deletedStates,
    //   'stateSel': $rootScope.statesSel,
    //   'statesDetail': $rootScope.statesDetail
    // };
    // if (localStorageService.isSupported) {
    //   localStorageService.set('addListingSponsoredPage', spnonsoredPage, 'sessionStorage');
    // }
    vm.citySelCount++;
  };

  $rootScope.deSelectCityFun = function () {
    vm.citySelCount--;
  };

  vm.countySelCount = 0;
  $rootScope.countySelectFun = function () {
    // var spnonsoredPage = {
    //   'cityModel': $rootScope.cityModel,
    //   'countyModel': $rootScope.countyModel,
    //   'deletedStates': $rootScope.deletedStates,
    //   'stateSel': $rootScope.statesSel,
    //   'statesDetail': $rootScope.statesDetail
    // };
    // if (localStorageService.isSupported) {
    //   localStorageService.set('addListingSponsoredPage', spnonsoredPage, 'sessionStorage');
    // }
    vm.countySelCount++;
  };

  $rootScope.deSelectCountyFun = function () {
    vm.countySelCount--;
  };
}

function getCountyCity(vm, state, stateMap, token, service, $injector, $rootScope, localStorageService) {
  service.getCityCountyByState(token, state.shortname).then(function (response) {
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
    var citySelect = '<div class="' + widthCity + '" ng-dropdown-multiselect="" options="$root.city" checkboxes="true" selected-model="$root.cityModel" extra-settings="$root.multiselectModelSettingsCity" translation-texts="$root.cityText" events="{ onSelectAll: onSelectAllCity, onItemSelect: citySelectFun, onItemDeselect: deSelectCityFun}" ></div>';
    var countySelect = '<div class="' + widthCounty + '" ng-dropdown-multiselect="" options="$root.county" checkboxes="true" selected-model="$root.countyModel" extra-settings="$root.multiselectModelSettingsCounty" translation-texts="$root.countyText" events="{ onSelectAll: onSelectAllCounty, onItemSelect: countySelectFun, onItemDeSelect: deSelectCountyFun }"></div>';

    // var displayStateMap = '<div class="col-sm-12"><div class="modal-header header_state_map"><div class="col-sm-4">' + countySelect + '</div><div class="col-sm-4 text-center"><h3 class="modal-title" id="modal-title">' + state.fullname + '</h3></div><div class="col-sm-4 text-right">' + citySelect + '</div></div></div></div></div><div class="modal-body map_body_state" id="modal-body"><div class="col-md-12 col-sm-12 col-xs-12 col-lg-12 ">' + stateMap + '</div></div><div class="modal-footer map_popup_footer"><div style="position: absolute;top: 10px;text-align: right;width: 95%;cursor: pointer;border-radius: 100%;" ng-click="cancel()"><i class="fa fa-window-close fa-1" aria-hidden="true" style="position: absolute;top: 0px; font-size: 24px;border-radius: 100%;"></i></div>';

    var displayStateMap = '<div class="col-sm-12"><div class="modal-header header_state_map"><div class="col-sm-5 text-right">' + countySelect + '</div><div class="col-sm-3 text-center"><h3 class="modal-title" id="modal-title">' + state.fullname + '</h3></div><div class="col-sm-4 text-left">' + citySelect + '</div></div></div></div></div><div class="modal-body map_body_state" id="modal-body"><div class="col-md-12 col-sm-12 col-xs-12 col-lg-12 ">' + stateMap + '</div></div><div class="modal-footer map_popup_footer"><div style="position: absolute;top: -10px;text-align: right;width: 100%;cursor: pointer;border-radius: 100%;" ng-click="cancel()"><i class="fa fa-times fa-1" aria-hidden="true" style="position: absolute;top: 0px; font-size: 24px;border-radius: 100%;"></i></div>';

    var modalInstance = $injector.get('$uibModal').open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      size: 'lg',
      template: displayStateMap,
      controller: function () {
        $rootScope.ok = function () {
          modalInstance.close();
        };
        $rootScope.cancel = function () {
          if (vm.citySelCount > 0) {
            if (angular.isUndefined($rootScope.deletedStates[0])) {
              modalInstance.dismiss('cancel');
              saveToLocalStorage($rootScope, localStorageService);
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
              return true;
            }
            if ($rootScope.deletedStates.indexOf(vm.activeState.name.toLowerCase()) >= 0) {
              $rootScope.deletedStates.splice($rootScope.deletedStates.indexOf(vm.activeState.name.toLowerCase()), 1);
            }
          }
          // save to localStorageService
          saveToLocalStorage($rootScope, localStorageService);

          modalInstance.dismiss('cancel');
          return true;
        };
        $rootScope.onSelectAllCity = function () {

        };
        $rootScope.onSelectAllCounty = function () {

        };
      },
      bindToController: true
    });
  });
}

// saving to localStorageService
function saveToLocalStorage($rootScope, localStorageService) {
  var spnonsoredPage = {
    'cityModel': $rootScope.cityModel,
    'countyModel': $rootScope.countyModel,
    'deletedStates': $rootScope.deletedStates,
    'stateSel': $rootScope.statesSel,
    'statesDetail': $rootScope.statesDetail,
    'treatmentCenter': $rootScope.treatmentCentersModel
  };
  if (localStorageService.isSupported) {
    localStorageService.set('addListingSponsoredPage', spnonsoredPage, 'sessionStorage');
  }
}
