module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'SignUpService', 'localStorageService', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, service, localStorageService) {
  var vm = this;
  vm.testCenter = function () {
    $state.go(UIState.SIGN_UP.TEST_CENTER);
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
