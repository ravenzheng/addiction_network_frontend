function ctrl($scope, $document, $log, $rootScope, Status, $window, localStorageService, $state, UIState, AdvertisementService) {
  var vm = this;
  $rootScope.activeLink = 'Banner Ads';
  // initializing form data
  vm.name = '';
  vm.err_type = 1;
  var lm = this;
  lm.previous = function () {
    $state.go(UIState.ADD_LISTING.SPONSORED_PAGES);
  };

  // get values from localStorageService
  if (angular.isDefined(localStorageService.get('addListingBannerAds', 'sessionStorage'))) {
    var bannerInfo = localStorageService.get('addListingBannerAds', 'sessionStorage');
    if (bannerInfo !== null) {
      vm.position = bannerInfo.position;
      vm.name = bannerInfo.name;
      vm.content = bannerInfo.content;
      vm.center_web_link = bannerInfo.center_web_link;
    }
  }
  // Uploaded image preview
  $scope.uploadImagePreview = function (element) {
    vm.err_type = 0;
    var reader = new FileReader();
    reader.readAsDataURL(element.files[0]);
    reader.onload = function (e) {
      vm.preview_img = e.target.result;
      $document[0].getElementById('logo_preview').src = vm.preview_img;
    };
  };

  vm.submit = function () {
    // validating file type
    if (vm.content) {
      var imageType = String(vm.content.type);
      if (imageType.includes('image/') === false) {
        vm.err_type = 1;
        return;
      }
      vm.err_type = 0;
    } else {
      return;
    }

    if (angular.isDefined(vm.center_web_link)) {
      var link = vm.center_web_link;
    } else {
      link = '';
    }
    var formData = new FormData();
    var bannerData = {
      'position': vm.position,
      'name': vm.name,
      'content': vm.content,
      'center_web_link': link
    };
    for (var key in bannerData) {
      formData.append('banner_ads[' + key + ']', bannerData[key]);
    }

    // saving to localStorageService
    if (localStorageService.isSupported) {
      localStorageService.set('addListingBannerAds', bannerData, 'sessionStorage');
    }

    var token = localStorageService.get('signupToken');
    AdvertisementService.advertisementAddSignUp(formData, token).then(function () {
      $rootScope.$emit(Status.SUCCEEDED, Status.BANNER_ADD_SUCCEESS_MSG);
      $rootScope.doneSteps = $rootScope.doneSteps.concat(['bannerAd']);
      $rootScope.addListingStepDone = 8;
      $state.go(UIState.ADD_LISTING.FEATURED_LISTING_PAGE1);
    }).catch(function (err) {
      $log.error(err);
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
    });
  };

  vm.skipStep = function () {
    $rootScope.doneSteps = $rootScope.doneSteps.concat(['bannerAd']);
    $rootScope.addListingStepDone = 8;
    $state.go(UIState.ADD_LISTING.FEATURED_LISTING_PAGE1);
  };
}

module.exports = ['$scope', '$document', '$log', '$rootScope', 'Status', '$window', 'localStorageService', '$state', 'UIState', 'AdvertisementService', ctrl];
