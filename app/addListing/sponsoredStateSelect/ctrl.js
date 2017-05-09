module.exports = ['$rootScope', '$injector', '$state', 'UIState', 'SponsorService', 'localStorageService', ctrl];

function ctrl($rootScope, $injector, $state, UIState, service, localStorageService) {
  var vm = this;
  vm.onStateSelect = function (state) {
    // $state.go(UIState.SPONSOR_HOME.STATE, {
    //   stateName: state.shortname
    // });
    // console.log('state: ' + state.fullname);

    vm.open(state);
  };
  $rootScope.countyText = {
    buttonDefaultText: 'Select County'
  };
  $rootScope.cityText = {
    buttonDefaultText: 'Select City'
  };
  $rootScope.cityModel = [];
  $rootScope.countyModel = [];

  var token = localStorageService.get('signupToken');

  vm.open = function (state) {
    // var stateMap = '<svg version="1.1" id="state_map" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewbox="' + state.viewbox + '" xml:space="preserve">  <g id="state">   <g> <path ng-attr-id="' + state.id + '" ng-attr-fill="' + state.upcolor + '" ng-attr-stroke="' + state.statestroke + '" ng-attr-d="' + state.d + '" stroke-width="1" cursor="pointer"></path></g></g><g id="abb"><text ng-attr-id="' + state.shortname + '" ng-attr-transform="' + state.transform + '" pointer-events="none"><tspan x="0" y="0" font-family="Arial" font-size="11" ng-attr-fill="' + state.namefill + '">' + state.shortname + '</tspan></text></g></svg>';
    // var stateMap = '<div id="googleMap" style="width:100%;height:400px;"></div><script>function myMap() {  var mapProp = {center: new google.maps.LatLng(' + state.latlong + '),zoom:' + state.zoomlevel + '};var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);}</script><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCzZiyHarHVkYQCBywa0HYl0MD77BRiL64&callback=myMap"></script>';
    var stateMap = '<img src="themes/addiction/images/' + state.image + '.png" style = width:100%>';
    getCountyCity(vm, state, stateMap, token, service, $injector, $rootScope);
  };
}

function getCountyCity(vm, state, stateMap, token, service, $injector, $rootScope) {
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
    var totalCityHeight = 20 * cityLength + 125;
    if (totalCityHeight > 700) {
      totalCityHeight = 550;
    }
    $rootScope.multiselectModelSettingsCity = {
      scrollableHeight: totalCityHeight + 'px',
      scrollable: true,
      checkBoxes: true,
      showCheckAll: false,
      showUncheckAll: false,
      enableSearch: true,
      required: true
    };
    for (key in response.county) {
      modifiedCountySelect[i] = {
        id: response.county[key].id,
        label: response.county[key].name
      };
      var countyLength = response.county.length;
      i++;
    }
    var totalCountyHeight = 20 * countyLength + 125;
    if (totalCountyHeight > 700) {
      totalCountyHeight = 550;
    }
    $rootScope.multiselectModelSettingsCounty = {
      scrollableHeight: totalCountyHeight + 'px',
      scrollable: true,
      checkBoxes: true,
      showCheckAll: false,
      showUncheckAll: false,
      enableSearch: true,
      required: true
    };
    $rootScope.city = modifiedCitySelect;
    $rootScope.county = modifiedCountySelect;
    var citySelect = '<div ng-dropdown-multiselect="" options="$root.city" checkboxes="true" selected-model="$root.cityModel" extra-settings="$root.multiselectModelSettingsCity" translation-texts="$root.cityText"></div>';
    var countySelect = '<div ng-dropdown-multiselect="" options="$root.county" checkboxes="true" selected-model="$root.countyModel" extra-settings="$root.multiselectModelSettingsCounty" translation-texts="$root.countyText"></div>';

    // var displayStateMap = '<div class="col-sm-12"><div class="modal-header header_state_map"><div class="col-sm-4">' + countySelect + '</div><div class="col-sm-4 text-center"><h3 class="modal-title" id="modal-title">' + state.fullname + '</h3></div><div class="col-sm-4 text-right">' + citySelect + '</div></div></div></div></div><div class="modal-body map_body_state" id="modal-body"><div class="col-md-12 col-sm-12 col-xs-12 col-lg-12 ">' + stateMap + '</div></div><div class="modal-footer map_popup_footer"><div style="position: absolute;top: 10px;text-align: right;width: 95%;cursor: pointer;border-radius: 100%;" ng-click="cancel()"><i class="fa fa-window-close fa-1" aria-hidden="true" style="position: absolute;top: 0px; font-size: 24px;border-radius: 100%;"></i></div>';

    var displayStateMap = '<div class="col-sm-12"><div class="modal-header header_state_map"><div class="col-sm-4 text-center">' + countySelect + '</div><div class="col-sm-4 text-center"><h3 class="modal-title" id="modal-title">' + state.fullname + '</h3></div><div class="col-sm-4 text-center">' + citySelect + '</div></div></div></div></div><div class="modal-body map_body_state" id="modal-body"><div class="col-md-12 col-sm-12 col-xs-12 col-lg-12 ">' + stateMap + '</div></div><div class="modal-footer map_popup_footer"><div style="position: absolute;top: -10px;text-align: right;width: 100%;cursor: pointer;border-radius: 100%;" ng-click="cancel()"><i class="fa fa-times fa-1" aria-hidden="true" style="position: absolute;top: 0px; font-size: 24px;border-radius: 100%;"></i></div>';

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
          modalInstance.dismiss('cancel');
        };
      },
      bindToController: true
    });
  });
}
