module.exports = ['$state', 'UIState', '$log', '$rootScope', 'localStorageService', 'TreatmentCenterService', ctrl];

function ctrl($state, UIState, $log, $rootScope, localStorageService, service) {
  var vm = this;
  var membershipType = localStorageService.get('membershipType', 'sessionStorage');
  // alert(membershipType);
  if (membershipType !== 'free' || membershipType !== null) {
    // $state.go(UIState.MY_PROFILE.PAYMENT_DETAILS_ADD);
  }
  vm.payment = function (type) {
    $rootScope.membershipType = type;
    localStorageService.set('membershipType', type, 'sessionStorage');
    $state.go(UIState.MY_PROFILE.PAYMENT_DETAILS_ADD);
  };

  vm.cartDetails = [];
  // get cart details using api
  service.getCartDetails().then(function (result) {
    vm.cartDetails = result.cart_subscription;
    $log.info(result);
    // demo data inserting
    vm.cartDetails.items[0].sponsored_layouts.state = [{
      'name': 'state1'
    }, {
      'name': 'state2'
    }, {
      'name': 'state3'
    }];
    vm.cartDetails.items[0].sponsored_layouts.county = [{
      'name': 'county1'
    }, {
      'name': 'county2'
    }, {
      'name': 'county3'
    }];
    vm.cartDetails.items[0].sponsored_layouts.city = [{
      'name': 'city1'
    }, {
      'name': 'city1'
    }, {
      'name': 'city1'
    }];
    vm.cartDetails.items[0].sponsored_layouts.categories = [{
      'name': 'at1'
    }, {
      'name': 'county2'
    }, {
      'name': 'county3'
    }];
  }).catch(function (err) {
    $log.info(err);
  });

  /*********************** Show/hide functionality for cart details *********************/
  vm.centerToggle = function (itemId) {
    if (vm.productShow[itemId]) {
      vm.productShow[itemId] = 0;
      // vm.centerToggleIconClass[itemId] = 'fa-plus-square-o';
      vm.centerToggleIconClass[itemId] = 'fa-plus';
    } else {
      vm.productShow[itemId] = 1;
      //  vm.centerToggleIconClass[itemId] = 'fa-minus-square-o';
      vm.centerToggleIconClass[itemId] = 'fa-minus';
    }
  };

  vm.sponsorshipToggle = function (itemId) {
    if (vm.sponsorshipShow[itemId]) {
      vm.sponsorshipShow[itemId] = 0;
      vm.sponsorshipToggleIconClass[itemId] = 'fa-plus';
    } else {
      vm.sponsorshipShow[itemId] = 1;
      vm.sponsorshipToggleIconClass[itemId] = 'fa-minus';
    }
  };

  vm.stateToggle = function (itemId) {
    if (vm.stateShow[itemId]) {
      vm.stateShow[itemId] = 0;
      vm.stateToggleIconClass[itemId] = 'fa-plus';
    } else {
      vm.stateShow[itemId] = 1;
      vm.stateToggleIconClass[itemId] = 'fa-minus';
    }
  };
  vm.cityToggle = function (itemId) {
    if (vm.cityShow[itemId]) {
      vm.cityShow[itemId] = 0;
      vm.cityToggleIconClass[itemId] = 'fa-plus';
    } else {
      vm.cityShow[itemId] = 1;
      vm.cityToggleIconClass[itemId] = 'fa-minus';
    }
  };
  vm.countyToggle = function (itemId) {
    if (vm.countyShow[itemId]) {
      vm.countyShow[itemId] = 0;
      vm.countyToggleIconClass[itemId] = 'fa-plus';
    } else {
      vm.countyShow[itemId] = 1;
      vm.countyToggleIconClass[itemId] = 'fa-minus';
    }
  };
  vm.categoryToggle = function (itemId) {
    if (vm.categoryShow[itemId]) {
      vm.categoryShow[itemId] = 0;
      vm.categoryToggleIconClass[itemId] = 'fa-plus';
    } else {
      vm.categoryShow[itemId] = 1;
      vm.categoryToggleIconClass[itemId] = 'fa-minus';
    }
  };
  vm.adsToggle = function (itemId) {
    if (vm.adsShow[itemId]) {
      vm.adsShow[itemId] = 0;
      vm.adsToggleIconClass[itemId] = 'fa-plus';
    } else {
      vm.adsShow[itemId] = 1;
      vm.adsToggleIconClass[itemId] = 'fa-minus';
    }
  };
  vm.expandAllFun = function (tf) {
    for (var key in vm.cartDetails.items) {
      vm.centerToggle(vm.cartDetails.items[key].id);
    }

  };

  /*********************** End Show/hide functionality for cart details *********************/

}
