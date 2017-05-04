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

  $rootScope.multiselectModelSettings = {
    scrollableHeight: '200px',
    scrollable: true,
    checkBoxes: true,
    showCheckAll: false,
    showUncheckAll: false,
    enableSearch: true,
    required: true
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
    var stateMap = '<div id="googleMap" style="width:100%;height:400px;"></div><script>function myMap() {  var mapProp = {center: new google.maps.LatLng(' + state.latlong + '),zoom:' + state.zoomlevel + '};var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);}</script><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCzZiyHarHVkYQCBywa0HYl0MD77BRiL64&callback=myMap"></script>';
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
      i++;
    }

    for (key in response.county) {
      modifiedCountySelect[i] = {
        id: response.county[key].id,
        label: response.county[key].name
      };
      i++;
    }

    $rootScope.city = modifiedCitySelect;
    $rootScope.county = modifiedCountySelect;

    var citySelect = '<div class="col-md-6 col-sm-6 col-xs-12 col-lg-6 text-center absolute-city"><div  ng-dropdown-multiselect="" options="$root.city" checkboxes="true" selected-model="$root.cityModel" extra-settings="$root.multiselectModelSettings" translation-texts="$root.cityText"></div></div>';
    var countySelect = '<div class="col-md-6 col-sm-6 col-xs-12 col-lg-6 text-center absolute-county"><div ng-dropdown-multiselect="" options="$root.county" checkboxes="true" selected-model="$root.countyModel" extra-settings="$root.multiselectModelSettings" translation-texts="$root.countyText" ></div></div>';
    //  console.log('test: ' + citySelect);
    var displayStateMap = '<div class="modal-header"><h3 class="modal-title" id="modal-title">' + state.fullname + '</h3></div><div class="modal-body" id="modal-body"><div class="col-md-12 col-sm-12 col-xs-12 col-lg-12 ">' + stateMap + '</div><div class="col-md-12 col-sm-12 col-xs-12 col-lg-12 ">' + citySelect + countySelect + '</div></div><div class="modal-footer"><button class="btn btn-success" type="button" ng-click="ok()">Select</button><button class="btn btn-danger" type="button" ng-click="cancel()"><i class="fa fa-window-close fa-1" aria-hidden="true"></i></button ></div>';
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
