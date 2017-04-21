module.exports = ['$rootScope', '$log', '$state', 'UIState', 'MapService', ctrl];

function ctrl($rootScope, $log, $state, UIState, mapService) {
  // todo
  var vm = this;
  var lm = this;
  lm.previous = function () {
    $state.go(UIState.ADD_LISTING.USER_INFO);
  };
  vm.multiselectModelCategories = [];
  vm.multiselectModelSettings = {
    scrollableHeight: '200px',
    scrollable: true,
    checkBoxes: true,
    showCheckAll: false,
    showUncheckAll: false
  };

  vm.addListingCategories = [
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
    for (var key in vm.multiselectModelCategories) {
      var categories = String(vm.multiselectModelCategories[key].id);
      categoryName[key] = categories;
    }
    $rootScope.centerInfo = {
      'center_name': vm.center_name,
      'description': vm.description,
      'center_web_link': vm.center_web_link,
      'listing_image': vm.listing_image,
      'heading_1': 'Overview of Program',
      'heading_2': 'Treatment Approach',
      'heading_3': 'Unique Selling Points',
      'category_id': categoryName,
      // 'heading_4': vm.heading_4,

      // 'content_4': vm.content_4,
      'address_line_1': vm.address_line_1,
      //  'address_line_2': vm.address_line_2,
      'city': vm.city,
      'pincode': vm.pincode,
      'state': vm.state,
      'phone': vm.intakephone,
      'email': vm.intakeemail,
      'featured': false,
      'listing_type': 'free'
    };
    //  $log.info('  data:' + $rootScope.formdata);
    $state.go(UIState.ADD_LISTING.CENTER_DETAILS);
  };
}
