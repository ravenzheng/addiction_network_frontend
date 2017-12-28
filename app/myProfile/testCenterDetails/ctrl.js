module.exports = ['$state', 'UIState', '$log', 'Status', '$rootScope', 'localStorageService', 'TreatmentCenterService', ctrl];

function ctrl($state, UIState, $log, Status, $rootScope, localStorageService, service) {
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
  vm.loadCart = function () {
    service.getCartDetails().then(function (result) {
      vm.cartDetails = result.cart_subscription;
    }).catch(function (err) {
      $log.info(err);
    });
  };
  vm.loadCart();

  vm.deleteSponsorAds = function (itemId) {
    $log.info(itemId);
    // delete sponsored ads using itemId
    service.deleteSponsorAds(itemId).then(function (result) {
      $rootScope.$emit(Status.SUCCEEDED, 'Item Removed');
      vm.loadCart();
    }).catch(function (err) {
      $log.info(err);
    });
  };

  vm.upgradeMembership = function (currentMembership, targetMembership, cenId) {
    $log.info(currentMembership + '  -- ' + targetMembership + '  ' + cenId);

    var newMembership = '';
    if (currentMembership ===  targetMembership) {
      $rootScope.$emit(Status.FAILED, 'Already taken');
    } else if (targetMembership === 'paid') {
      newMembership = 'sponsored';
    } else if (targetMembership === 'featured') {
      newMembership = 'featured';
    }
    var formData = new FormData();
    var membership = {
      'package': newMembership
    };
    for (var key in membership) {
      formData.append(key, membership[key]);
    }
    if (newMembership !== '') {
      service.upgradeMembership(formData, cenId).then(function (result) {
        $rootScope.$emit(Status.SUCCEEDED, result.success);
        vm.loadCart();
      }).catch(function (err) {
        $log.info(err);
      });
    }
  };

  // start process of adding another treatment center //
  vm.addTestCenter = function () {
    // *************initial steps*************//
      // reset previous localstorage
    localStorageService.remove('membership', 'center_added', 'userInfo', 'signupSponsoredPage', 'membershipType', 'bannerAdded', 'sponsorAdded', 'signupToken');
    $rootScope.addCenterInitialize = 1;
    var signUp = {
      'signupStep': {}
    };
    localStorageService.set('signupStepsData', signUp, 'sessionStorage');
    $state.go(UIState.MY_PROFILE.ADD_TEST_CENTER);
  };

  /** ********************* Show/hide functionality for cart details *********************/
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

  /** ********************* End Show/hide functionality for cart details *********************/
}
