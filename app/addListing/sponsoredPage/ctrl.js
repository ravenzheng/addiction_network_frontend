function ctrl($log, $scope, $state, UIState, $stateParams, $rootScope, $document, Status, SponsorService, localStorageService) {
  var vm = this;
  $rootScope.activeLink = 'Sponsored Pages';
  vm.multiselectModelLayoutIds = [];
  vm.multiselectModelSettings = {
    scrollableHeight: '200px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: false,
    checkBoxes: true
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

  vm.previous = function () {
    $state.go(UIState.ADD_LISTING.PAYMENT_DETAILS);
  };
  var token = localStorageService.get('signupToken');
  vm.submit = function () {
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
    for (key in $rootScope.countyModel) {
      id = String($rootScope.countyModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }
    for (key in $rootScope.cityModel) {
      id = String($rootScope.cityModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }
    var formData = new FormData();
    var sponsorData = {
      'sponsored_listing_layout_ids': sponsoredListingIds
    };
    for (key in sponsorData) {
      formData.append('sponsored_ad[' + key + ']', sponsorData[key]);
    }
    SponsorService.editSponsorSignup(formData, centerIds, token).then(function () {
      $rootScope.$emit(Status.SUCCEEDED, Status.SPONSOR_EDIT_SUCCEESS_MSG);
      $rootScope.addListingStepDone = 7;
      $rootScope.doneSteps = $rootScope.doneSteps.concat(['sponsoredPage']);
      $state.go(UIState.ADD_LISTING.BANNER_AD);
    }).catch(function (err) {
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
      throw err;
    });
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
    // saving to localStorageService
    if (angular.isDefined(localStorageService.get('addListingSponsoredPage', 'sessionStorage'))) {
      sponsoredInfo = localStorageService.get('addListingSponsoredPage', 'sessionStorage');

      if (sponsoredInfo !== null) {
        sponsoredInfo.treatmentCenter = vm.treatmentCentersModel;
      } else {
        sponsoredInfo = {
          'treatmentCenter': vm.treatmentCentersModel
        };
      }
      $rootScope.centerSelected = vm.treatmentCentersModel;
      localStorageService.set('addListingSponsoredPage', sponsoredInfo, 'sessionStorage');
    }
  };
  $rootScope.centerDeSelect = function () {
    if (angular.isDefined(localStorageService.get('addListingSponsoredPage', 'sessionStorage'))) {
      sponsoredInfo = localStorageService.get('addListingSponsoredPage', 'sessionStorage');
      if (sponsoredInfo !== null) {
        sponsoredInfo.treatmentCenter = vm.treatmentCentersModel;
      } else {
        sponsoredInfo = {
          'treatmentCenter': vm.treatmentCentersModel
        };
      }
      $rootScope.centerSelected = vm.treatmentCentersModel;
      localStorageService.set('addListingSponsoredPage', sponsoredInfo, 'sessionStorage');
    }
  };
}
module.exports = ['$log', '$scope', '$state', 'UIState', '$stateParams', '$rootScope', '$document', 'Status', 'SponsorService', 'localStorageService', '$timeout', ctrl];
