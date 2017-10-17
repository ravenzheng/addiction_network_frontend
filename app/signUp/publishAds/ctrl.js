module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'SignUpService', 'localStorageService', 'Status', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, service, localStorageService, Status) {
  var vm = this;
  var lm = $rootScope;
  var token = localStorageService.get('signupToken');
  var centerId = localStorageService.get('signupCenterId');

  var alreadyPublished = 0;
  // testing if ads are already published for same center id
  service.getPublishAds(centerId, token).then(function (result) {
    $log.info(result);
    if (result.banner_ads.length === 0) {
      alreadyPublished = 0;
    } else if (result.banner_ads.length > 0) {
      alreadyPublished = 1;
    }
  }).catch(function (err) {
    $log.info(err);
    lm.$emit(Status.SUCCEEDED, 'Something went wrong');
  });

  vm.count = 1;
  vm.publish_ads2 = function () {
    //  lm.$emit(Status.PROCESSING, Status.PROCESSING_MSG);
    //  $state.go(UIState.SIGN_UP.PUBLISH_ADS2);
    if (alreadyPublished === 1) {
      lm.$emit(Status.FAILED, 'Ads are already published for this center.');
      return;
    }

    var sideImage = vm.sideImage;
    var headerImage = vm.headerImage;
    var footerImage = vm.footerImage;
    vm.validAds = [];
    if (angular.isUndefined(vm.sideImage) || angular.isUndefined(vm.weblinkSidebar)) {
      sideImage = '';
      // vm.weblinkSidebar = '';
    } else {
      vm.validAds.push('sidebar');
    }
    if (angular.isUndefined(vm.headerImage) || angular.isUndefined(vm.weblinkHeader)) {
      headerImage = '';
      // vm.weblinkHeader = '';
    } else {
      vm.validAds.push('header');
    }
    if (angular.isUndefined(vm.footerImage) || angular.isUndefined(vm.weblinkFooter)) {
      footerImage = '';
      // vm.weblinkFooter = '';
    } else {
      vm.validAds.push('footer');
    }

    for (var cnt in vm.validAds) {
      // $log.info('cnt' + validAds[cnt]);
      if (vm.validAds[cnt] === 'sidebar') {
        vm.submitAds(sideImage, 'sidebar', vm.weblinkSidebar);
      } else if (vm.validAds[cnt] === 'header') {
        vm.submitAds(headerImage, 'header', vm.weblinkHeader);
      } else if (vm.validAds[cnt] === 'footer') {
        vm.submitAds(footerImage, 'footer', vm.weblinkFooter);
      }
    }
    // return;
    // vm.submitAds(sideImage, 'sidebar', vm.weblinkSidebar);
    // vm.submitAds(headerImage, 'header', vm.weblinkHeader);
    // vm.submitAds(footerImage, 'footer', vm.weblinkFooter);
  };

  vm.submitAds = function (content, position, weblink) {
    lm.$emit(Status.PROCESSING, Status.PROCESSING_MSG);

    var formData = new FormData();
    var publishAds = {
      'treatment_center_id': centerId,
      'content': content,
      'position': position,
      'center_web_link': weblink
    };
    for (var key in publishAds) {
      formData.append('banner_ad[' + key + ']', publishAds[key]);
    }
    service.publishAds(formData, token).then(function (result) {
      $log.info(result);
      //  lm.$emit(Status.SUCCEEDED, 'Ads submitted');
      if (vm.count >= vm.validAds.length) {
        // if (vm.count >= 3) {
        lm.$emit(Status.SUCCEEDED, 'Ads submitted');
        //  $state.go(UIState.SIGN_UP.PUBLISH_ADS2);
        $state.go(UIState.SIGN_UP.UPDATE_ADS);
      }
      vm.count++;
    }).catch(function (err) {
      $log.info(err);
      vm.count--;
      lm.$emit(Status.FAILED, 'Something went wrong');
    });
  };
}
