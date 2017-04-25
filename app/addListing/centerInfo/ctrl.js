module.exports = ['$rootScope', '$log', '$state', 'UIState', 'MapService', ctrl];

function ctrl($rootScope, $log, $state, UIState, mapService) {
  // todo
  // var vm = this;
  var vm = $rootScope; // this;
  var lm = this;
  $rootScope.activeLink = 'Treatment Center';
  lm.previous = function () {
    $state.go(UIState.ADD_LISTING.PAID_MEMBER);
  };
  lm.multiselectModelCategories = [];
  lm.multiselectModelSettings = {
    scrollableHeight: '200px',
    scrollable: true,
    checkBoxes: true,
    showCheckAll: false,
    showUncheckAll: false,
    required: true
  };

  lm.addListingCategories = [
    {
      'label': 'Inpatient',
      'id': '1'
    },
    {
      'label': 'Outpatient',
      'id': '2'
    },
    {
      'label': 'Sober Living',
      'id': '3'
    },
    {
      'label': 'Adolescent',
      'id': '4'
    }
  ];

  vm.analyze = function () {};
  mapService.getStates().then(function (response) {
    vm.states = response;
  }).catch(function (err) {
    vm.error_message = err;
  });

  vm.getCities = function () {
    var state = vm.state;
    mapService.getCitiesByState(state).then(function (response) {
      vm.cities = response;
    }).catch(function (err) {
      vm.error_message = err;
    });
  };

  vm.saveStep3 = function () {
    var categoryName = [];
    for (var key in lm.multiselectModelCategories) {
      var categories = String(lm.multiselectModelCategories[key].id);
      categoryName[key] = categories;
    }
    $rootScope.centerInfo = {
      'category_id': categoryName,
      'center_name': vm.center_name,
      'description': vm.description,
      'center_web_link': vm.center_web_link,
      'listing_image': vm.listing_image,
      'address_line_1': vm.address_line_1,
      'city': vm.city,
      'pincode': vm.pincode,
      'state': vm.state,
      'intakephone': vm.intakephone,
      'intakeemail': vm.intakeemail,
      'featured': false,
      'listing_type': 'free'
    };
    // $log.info('data:' + $rootScope.centerInfo);
    $state.go(UIState.ADD_LISTING.CENTER_DETAILS);
  };
}
