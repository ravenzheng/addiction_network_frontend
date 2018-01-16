module.exports = ['$injector', '$timeout', '$state', 'UIState', '$log', 'Status', '$rootScope', 'localStorageService', 'TreatmentCenterService', ctrl];

function ctrl($injector, $timeout, $state, UIState, $log, Status, $rootScope, localStorageService, service) {
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
  vm.loadCart = function (cenId) {
    service.getCartDetails().then(function (result) {
      vm.cartDetails = result.cart_subscription;
      if (cenId !== '') {
        $timeout(function () {
          vm.centerToggle(cenId);
        }, 800);
      }
    }).catch(function (err) {
      $log.info(err);
    });
  };
  vm.loadCart('');

  vm.deleteSponsorAds = function (itemId, cenId) {
    // delete sponsored ads using itemId
    service.deleteSponsorAds(itemId).then(function (result) {
      $rootScope.$emit(Status.SUCCEEDED, 'Item Removed');
      vm.loadCart(cenId);
    }).catch(function (err) {
      $log.info(err);
    });
  };

  vm.deleteConfirm = function (itemId, cenId) {
    var deleteConfHtml = '<div class="col-sm-12"><div class="modal-header"><div class="col-sm-12 text-center"><h3 class="modal-title" id="modal-title">Do you confirm?</h3></div></div></div></div></div><div class="modal-body map_body_state" id="modal-body"><div class="col-md-12 col-sm-12 col-xs-12 col-lg-12"></div></div><div class="modal-footer map_popup_footer"><div class="col-sm-12 text-right"><button type="button" class="btn btn-primary" ng-click="ok(' + itemId + ',' + cenId + ')">Yes</button><button type="button" class="btn btn-primary" ng-click="cancel()">Cancel</button></div><div ng-click="cancel()"><i class="fa fa-times fa-1" aria-hidden="true" style="position: absolute;top: 0px; font-size: 24px;border-radius: 100%; margin-left:-10px;cursor: pointer;"></i></div>';

    var modalInstance = $injector.get('$uibModal').open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      size: 'md',
      template: deleteConfHtml,
      controllerAs: 'vmModalCtrl',
      controller: function () {
        var vmModal = this;
        // if (angular.isDefined($rootScope.checkedStateModel) && $rootScope.checkedStateModel.indexOf(state.shortname) >= 0) {
        //   vmModal.stateSelectCheck = true;
        // }
        $rootScope.ok = function (itemId, cenId) {
          vm.deleteSponsorAds(itemId, cenId);
          modalInstance.dismiss('cancel');
          return true;
        };
        $rootScope.cancel = function () {
          modalInstance.dismiss('cancel');
          return true;
        };
      },
      bindToController: true
    });
  };

  vm.upgradeMembership = function (currentMembership, targetMembership, cenId) {
    var newMembership = '';
    if (currentMembership === targetMembership) {
      $rootScope.$emit(Status.FAILED, 'Already taken');
    } else if (targetMembership === 'paid') {
      newMembership = 'paid';
      //  newMembership = 'sponsored';
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

  vm.upgradeMembershipConfirm = function (currentMembership, targetMembership, cenId) {
    var upgradeConfHtml = '<div class="col-sm-12"><div class="modal-header"><div class="col-sm-12 text-center"><h3 class="modal-title" id="modal-title">Do you confirm?</h3></div></div></div></div></div><div class="modal-body map_body_state" id="modal-body"><div class="col-md-12 col-sm-12 col-xs-12 col-lg-12"></div></div><div class="modal-footer map_popup_footer"><div class="col-sm-12 text-right"><button type="button" class="btn btn-primary" ng-click="ok(&quot;' + currentMembership + '&quot;,&quot;' + targetMembership + '&quot;,' + cenId + ')">Yes</button><button type="button" class="btn btn-primary" ng-click="cancel()">Cancel</button></div><div ng-click="cancel()"><i class="fa fa-times fa-1" aria-hidden="true" style="position: absolute;top: 0px; font-size: 24px;border-radius: 100%; margin-left:-10px;cursor: pointer;"></i></div>';

    var modalInstance = $injector.get('$uibModal').open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      size: 'md',
      template: upgradeConfHtml,
      controllerAs: 'vmModalCtrl',
      controller: function () {
        var vmModal = this;
        // if (angular.isDefined($rootScope.checkedStateModel) && $rootScope.checkedStateModel.indexOf(state.shortname) >= 0) {
        //   vmModal.stateSelectCheck = true;
        // }
        $rootScope.ok = function (currentMembership, targetMembership, cenId) {
          vm.upgradeMembership(currentMembership, targetMembership, cenId);
          modalInstance.dismiss('cancel');
          return true;
        };
        $rootScope.cancel = function () {
          modalInstance.dismiss('cancel');
          return true;
        };
      },
      bindToController: true
    });
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

  vm.editAds = function (ads) {
    $rootScope.addCenterInitialize = 1;
    $rootScope.bannerAdsInfo = ads;
    $state.go(UIState.MY_PROFILE.PUBLISH_ADS_EDIT);
  };

  vm.editSponsor = function (cenId, cenName, item) {
    var centerInfo = [{
      'id': cenId,
      'label': cenName
    }];
    localStorageService.set('current_center_edit', centerInfo);
    $rootScope.editSponsorCurCenter = centerInfo;
    var cartMode = {
      'mode': 'edit',
      'item': 'sponsored_layouts',
      'data': item
    };
    $rootScope.editSponsorCartMode = cartMode;
    $rootScope.addCenterInitialize = 1;
    localStorageService.set('cartModeEdit', cartMode);
    $state.go(UIState.MY_PROFILE.SPONSORED_PAGE_EDIT);
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
      vm.openCenterSubItems(itemId);
    }
  };

  vm.openCenterSubItems = function (itemId) {
    if (vm.sponsorshipShow[itemId] === 0) {
      vm.sponsorshipToggle(itemId);
    }
    if (vm.stateShow[itemId] === 0) {
      vm.stateToggle(itemId);
    }
    if (vm.cityShow[itemId] === 0) {
      vm.cityToggle(itemId);
    }
    if (vm.countyShow[itemId] === 0) {
      vm.countyToggle(itemId);
    }
    if (vm.categoryShow[itemId] === 0) {
      vm.categoryToggle(itemId);
    }
    if (vm.adsShow[itemId] === 0) {
      vm.adsToggle(itemId);
    }
  };

  vm.sponsorshipToggle = function (itemId) {
    if (vm.sponsorshipShow[itemId]) {
      vm.sponsorshipShow[itemId] = 0;
      // vm.sponsorshipToggleIconClass[itemId] = 'fa-plus';
    } else {
      vm.sponsorshipShow[itemId] = 1;
      // vm.sponsorshipToggleIconClass[itemId] = 'fa-minus';
    }
  };

  vm.stateToggle = function (itemId) {
    if (vm.stateShow[itemId]) {
      vm.stateShow[itemId] = 0;
    } else {
      vm.stateShow[itemId] = 1;
    }
  };
  vm.cityToggle = function (itemId) {
    if (vm.cityShow[itemId]) {
      vm.cityShow[itemId] = 0;
    } else {
      vm.cityShow[itemId] = 1;
    }
  };
  vm.countyToggle = function (itemId) {
    if (vm.countyShow[itemId]) {
      vm.countyShow[itemId] = 0;
    } else {
      vm.countyShow[itemId] = 1;
    }
  };
  vm.categoryToggle = function (itemId) {
    if (vm.categoryShow[itemId]) {
      vm.categoryShow[itemId] = 0;
    } else {
      vm.categoryShow[itemId] = 1;
    }
  };
  vm.adsToggle = function (itemId) {
    if (vm.adsShow[itemId]) {
      vm.adsShow[itemId] = 0;
    } else {
      vm.adsShow[itemId] = 1;
    }
  };
  vm.expandAllFun = function (tf) {
    for (var key in vm.cartDetails.items) {
      vm.centerToggle(vm.cartDetails.items[key].id);
    }
  };

  /** ********************* End Show/hide functionality for cart details *********************/
}
