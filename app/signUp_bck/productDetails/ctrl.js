module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'SignUpService', 'localStorageService', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, service, localStorageService) {
  var vm = this;
  vm.testCenter = function () {
    // removing variables related to sponsored page
    localStorageService.remove('signupSponsoredPage', 'sessionStorage');
    vm.clearRootscopeData();
    $state.go(UIState.SIGN_UP.TEST_CENTER);
  };
  vm.goBack = function () {
    $state.go(UIState.SIGN_UP.SPONSORED_PAGE);
  };

  vm.clearRootscopeData = function () {
    $rootScope.cityModel = {};
    $rootScope.countyModel = {};
    $rootScope.statesSel = {};
    $rootScope.checkedStateModel = {};
    $rootScope.checkedStateDetail = {};
    $rootScope.treatmentCentersModel = {};
    $rootScope.demographicModel = {};
    $rootScope.treatmentApproachModel = {};
    $rootScope.settingModel = {};
    $rootScope.additionalServicesModel = {};
    $rootScope.paymentModel = {};
    $rootScope.byDrugModel = {};
    $rootScope.checkedAllStates = {};
    $rootScope.centerSelected = {};
  };

  var token = localStorageService.get('signupToken');
  vm.cartDetails = [];
  // get cart details using api
  service.getCartDetails(token).then(function (result) {
    vm.cartDetails = result.cart_subscription;

  }).catch(function (err) {
    $log.info(err);
  });

  vm.gotoPayment = function () {
    localStorageService.set('cartTotal', vm.cartDetails.total_price);
    $state.go(UIState.SIGN_UP.PAYMENT);
  };

  vm.grandTotal = 0;
  vm.membership = '';
  vm.centersAdded = localStorageService.get('center_added');
  if (localStorageService.get('membership') !== null) {
    vm.membership = localStorageService.get('membership');
    vm.grandTotal += vm.membership.cost;
  } else {
    vm.centersAdded = [];
  }
  for (var key in vm.centersAdded) {
    vm.grandTotal += vm.centersAdded[key].cost;
  }

  vm.viewProfile = function () {
    $state.go(UIState.LOGIN);
  };

  /*********************** Show/hide functionality for cart details *********************/
  vm.centerToggle = function (itemId) {
    if (vm.productShow[itemId]) {
      vm.productShow[itemId] = 0;
      vm.centerToggleIconClass[itemId] = 'fa-plus-square-o';
    } else {
      vm.productShow[itemId] = 1;
      vm.centerToggleIconClass[itemId] = 'fa-minus-square-o';
    }
  };

  vm.membershipToggle = function (itemId) {
    if (vm.membershipShow[itemId]) {
      vm.membershipShow[itemId] = 0;
      vm.membershipToggleIconClass[itemId] = 'fa-plus-square-o';
    } else {
      vm.membershipShow[itemId] = 1;
      vm.membershipToggleIconClass[itemId] = 'fa-minus-square-o';
    }
  };
  vm.sponsorshipToggle = function (itemId) {
    if (vm.sponsorshipShow[itemId]) {
      vm.sponsorshipShow[itemId] = 0;
      vm.sponsorshipToggleIconClass[itemId] = 'fa-plus-square-o';
    } else {
      vm.sponsorshipShow[itemId] = 1;
      vm.sponsorshipToggleIconClass[itemId] = 'fa-minus-square-o';
    }
  };
  vm.stateToggle = function (itemId) {
    if (vm.stateShow[itemId]) {
      vm.stateShow[itemId] = 0;
      vm.stateToggleIconClass[itemId] = 'fa-plus-square-o';
    } else {
      vm.stateShow[itemId] = 1;
      vm.stateToggleIconClass[itemId] = 'fa-minus-square-o';
    }
  };
  vm.cityToggle = function (itemId) {
    if (vm.cityShow[itemId]) {
      vm.cityShow[itemId] = 0;
      vm.cityToggleIconClass[itemId] = 'fa-plus-square-o';
    } else {
      vm.cityShow[itemId] = 1;
      vm.cityToggleIconClass[itemId] = 'fa-minus-square-o';
    }
  };
  vm.countyToggle = function (itemId) {
    if (vm.countyShow[itemId]) {
      vm.countyShow[itemId] = 0;
      vm.countyToggleIconClass[itemId] = 'fa-plus-square-o';
    } else {
      vm.countyShow[itemId] = 1;
      vm.countyToggleIconClass[itemId] = 'fa-minus-square-o';
    }
  };
  vm.categoryToggle = function (itemId) {
    if (vm.categoryShow[itemId]) {
      vm.categoryShow[itemId] = 0;
      vm.categoryToggleIconClass[itemId] = 'fa-plus-square-o';
    } else {
      vm.categoryShow[itemId] = 1;
      vm.categoryToggleIconClass[itemId] = 'fa-minus-square-o';
    }
  };
  vm.adsToggle = function (itemId) {
    if (vm.adsShow[itemId]) {
      vm.adsShow[itemId] = 0;
      vm.adsToggleIconClass[itemId] = 'fa-plus-square-o';
    } else {
      vm.adsShow[itemId] = 1;
      vm.adsToggleIconClass[itemId] = 'fa-minus-square-o';
    }
  };
  /*********************** End Show/hide functionality for cart details *********************/

}
