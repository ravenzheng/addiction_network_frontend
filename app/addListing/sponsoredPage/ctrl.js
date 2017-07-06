function ctrl($injector, $log, $scope, $state, UIState, $stateParams, $rootScope, $window, $document, Status, SponsorService, localStorageService) {
  var vm = this;
  $rootScope.activeLink = 'Sponsored Pages';
  vm.multiselectModelLayoutIds = [];
  vm.multiselectModelSettings = {
    scrollableHeight: '200px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: false,
    checkBoxes: true,
    smartButtonMaxItems: 1,
    smartButtonTextConverter: function () {
      return 'Treatment Center';
    }
    //  selectionLimit: 1
  };
  vm.treatmentCenter = {
    buttonDefaultText: 'Select Treatment Center'
  };
  if (angular.isUndefined(vm.treatmentCentersModel)) {
    vm.treatmentCentersModel = [];
  }
  vm.sponsoredAdNormalModel = [];
  vm.sponsoredAdStateModel = [];
  vm.sponsoredAdCountyModel = [];
  vm.sponsoredAdCityModel = [];
  $rootScope.centerSelected = [];

  // getting values from localstorage if already set
  if (angular.isDefined(localStorageService.get('addListingSponsoredPage', 'sessionStorage'))) {
    var sponsoredInfo = localStorageService.get('addListingSponsoredPage', 'sessionStorage');
    if (sponsoredInfo !== null && angular.isDefined(sponsoredInfo.treatmentCenter)) {
      vm.treatmentCentersModel = sponsoredInfo.treatmentCenter;
    }
  }
  vm.skipTo = function () {
    $window.location.href = '/login';
  };
  vm.previous = function () {
    $state.go(UIState.ADD_LISTING.PAYMENT_DETAILS);
  };
  var token = localStorageService.get('signupToken');
  vm.submit = function () {
    openPrompt();
  };
  vm.submitComplete = function () {
    var centerIds = '';
    var id = '';
    var i = 0;
    for (var key in vm.treatmentCentersModel) {
      id = String(vm.treatmentCentersModel[key].id);
      centerIds = centerIds + id;
      if (i < vm.treatmentCentersModel.length - 1) {
        centerIds += ',';
      }
      i++;
    }
    var sponsoredListingIds = [];
    i = 0;
    for (key in $rootScope.countyModel) { // county ids
      id = String($rootScope.countyModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }
    for (key in $rootScope.cityModel) { // city ids
      id = String($rootScope.cityModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }

    if (angular.isDefined($rootScope.checkedAllStates) && $rootScope.checkedAllStates === true) {
      for (key in $rootScope.statesSel) { // state ids
        id = String($rootScope.statesSel[key].id);
        sponsoredListingIds[i] = id;
        i++;
      }
    } else {
      for (key in $rootScope.checkedStateDetail) { // state ids
        id = String($rootScope.checkedStateDetail[key].id);
        sponsoredListingIds[i] = id;
        i++;
      }
    }

    for (key in $rootScope.demographicModel) { // demographic ids
      id = String($rootScope.demographicModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }
    for (key in $rootScope.treatmentApproachModel) { // treatment approach ids
      id = String($rootScope.treatmentApproachModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }
    for (key in $rootScope.settingModel) { // setting ids
      id = String($rootScope.settingModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }
    for (key in $rootScope.additionalServicesModel) { // additional service
      id = String($rootScope.additionalServicesModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }
    for (key in $rootScope.paymentModel) { // payemnt
      id = String($rootScope.paymentModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }
    for (key in $rootScope.byDrugModel) { // by drug model
      id = String($rootScope.byDrugModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }

    var formData = new FormData();
    var sponsorData = {
      'sponsored_listing_layout_ids': sponsoredListingIds,
      'active': true
    };
    for (key in sponsorData) {
      formData.append('sponsored_ad[' + key + ']', sponsorData[key]);
    }
    SponsorService.editSponsorSignup(formData, centerIds, token).then(function () {
      $rootScope.$emit(Status.SUCCEEDED, Status.SPONSOR_EDIT_SUCCEESS_MSG);
      $rootScope.addListingStepDone = 6;
      $rootScope.doneSteps = $rootScope.doneSteps.concat(['sponsoredPage']);
      // clear sponsoredpage data
      localStorageService.remove('addListingSponsoredPage', 'sessionStorage');
      vm.clearRootscopeData();
      $state.go(UIState.ADD_LISTING.BANNER_AD);
    }).catch(function (err) {
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
      throw err;
    });
  };

  function openPrompt() {
    var popup = '<div class="col-sm-12"><div class="modal-header total_popup_modal"><div class="col-sm-12 text-center"><h3 class="modal-title" id="modal-title">Your total billing amount for sponsored ads is ${{$root.total}}</h3></div></div></div></div></div><div class="modal-body map_body_state" id="modal-body"><div class="col-md-12 col-sm-12 col-xs-12 col-lg-12"></div></div><div class="modal-footer map_popup_footer"><div class="col-sm-12"><div class="col-sm-7">Press okay to confirm.</div><div class="col-sm-5"><button type="button" class="btn btn-primary" ng-click="ok()">&nbsp;Okay&nbsp;</button></div></div><div ng-click="cancel()"><i class="fa fa-times fa-1" aria-hidden="true" style="position: absolute;top: 0px; font-size: 24px;border-radius: 100%; margin-left:-10px;cursor: pointer;"></i></div>';

    var modalInstance = $injector.get('$uibModal').open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      size: 'md',
      template: popup,
      controller: function () {
        vm.confirm = 0;
        $rootScope.ok = function () {
          vm.submitComplete();
          modalInstance.dismiss('cancel');
          vm.confirm = 1;
          return true;
        };
        $rootScope.cancel = function () {
          modalInstance.dismiss('cancel');
          vm.confirm = 0;
          return true;
        };
      },
      bindToController: true
    });
  }

  vm.clearRootscopeData = function () {
    $rootScope.cityModel = [];
    $rootScope.countyModel = [];
    $rootScope.statesSel = [];
    $rootScope.checkedStateModel = [];
    $rootScope.checkedStateDetail = [];
    $rootScope.treatmentCentersModel = [];
    $rootScope.demographicModel = [];
    $rootScope.treatmentApproachModel = [];
    $rootScope.settingModel = [];
    $rootScope.additionalServicesModel = [];
    $rootScope.paymentModel = [];
    $rootScope.byDrugModel = [];
    $rootScope.checkedAllStates = null;
    $rootScope.centerSelected = [];
    vm.treatmentCentersModel = [];
    $rootScope.onInit();
  };

  // getting data
  function sponsorList(page) {
    SponsorService.sponsorListSignup(page, token).then(function (response) {
      var sponsoredAds = response.sponsored_ads;
      var centers = [];
      for (var key in sponsoredAds) {
        centers[key] = {
          id: sponsoredAds[key].id,
          label: sponsoredAds[key].title
        };
      }
      vm.treatmentCenters = centers;
      $rootScope.treatmentCentersValue = centers;
    });
  }
  sponsorList('');
  $rootScope.centerSelect = function () {
    // use to prevent selection of demographic boxes without center select
    // $rootScope.centerOnchange();
    // saving to localStorageService
    if (angular.isDefined(localStorageService.get('addListingSponsoredPage', 'sessionStorage'))) {
      sponsoredInfo = localStorageService.get('addListingSponsoredPage', 'sessionStorage');
      if (sponsoredInfo !== null) {
        sponsoredInfo.treatmentCenter = vm.treatmentCentersModel;
        sponsoredInfo.centersValue = $rootScope.treatmentCentersValue;
      } else {
        sponsoredInfo = {
          'treatmentCenter': vm.treatmentCentersModel,
          'centersValue': $rootScope.treatmentCentersValue
        };
      }
      $rootScope.centerSelected = vm.treatmentCentersModel;
      localStorageService.set('addListingSponsoredPage', sponsoredInfo, 'sessionStorage');
    }
    $rootScope.onInit();
  };
  $rootScope.centerDeSelect = function () {
    // use to prevent selection of demographic boxes without center select
    // $rootScope.centerOnchange();
    if (angular.isDefined(localStorageService.get('addListingSponsoredPage', 'sessionStorage'))) {
      sponsoredInfo = localStorageService.get('addListingSponsoredPage', 'sessionStorage');
      // console.log(sponsoredInfo);
      if (sponsoredInfo !== null) {
        sponsoredInfo.treatmentCenter = vm.treatmentCentersModel;
        sponsoredInfo.centersValue = $rootScope.treatmentCentersValue;
      } else {
        sponsoredInfo = {
          'treatmentCenter': vm.treatmentCentersModel,
          'centersValue': $rootScope.treatmentCentersValue
        };
      }
      $rootScope.centerSelected = vm.treatmentCentersModel;
      localStorageService.set('addListingSponsoredPage', sponsoredInfo, 'sessionStorage');
    }
    $rootScope.onInit();
  };
}
module.exports = ['$injector', '$log', '$scope', '$state', 'UIState', '$stateParams', '$rootScope', '$window', '$document', 'Status', 'SponsorService', 'localStorageService', '$timeout', ctrl];
