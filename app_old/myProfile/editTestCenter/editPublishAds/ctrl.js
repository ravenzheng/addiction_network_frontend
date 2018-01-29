module.exports = ['$injector', '$document', '$scope', '$log', '$rootScope', '$state', 'UIState', 'TreatmentCenterService', 'localStorageService', 'Status', ctrl];

function ctrl($injector, $document, $scope, $log, $rootScope, $state, UIState, service, localStorageService, Status) {
  var vm = this;
  var lm = $rootScope;

  vm.adsInfo = $rootScope.bannerAdsInfo;

  var centerId = localStorageService.get('signupCenterId');
  // get previous steps localstorage data
  var signupData = localStorageService.get('signupStepsData', 'sessionStorage');

  vm.goHome = function () {
    $rootScope.addCenterInitialize = 0; // show left panel navigations
    $state.go(UIState.MY_PROFILE.TEST_CENTER_DETAILS);
  };

  var alreadyPublished = 0;
  // testing if ads are already published for same center id
  service.getPriceInfo().then(function (result) {
    vm.sidebar = result.banner_ads_sidebar;
    vm.header = result.banner_ads_header;
    vm.footer = result.banner_ads_footer;
  }).catch(function (err) {
    $log.info(err);
  });
  // service.getPublishAds(centerId).then(function (result) {
  //   // $log.info(result);
  //   if (result.banner_ads.length === 0) {
  //     alreadyPublished = 0;
  //   } else if (result.banner_ads.length > 0) {
  //     // alreadyPublished = 1;
  //   }
  // }).catch(function (err) {
  //   $log.info(err);
  //   lm.$emit(Status.SUCCEEDED, 'Something went wrong');
  // });
  vm.fileReqHeader = '';
  vm.fileReqFooter = '';
  vm.fileReqSidebar = '';
  // Uploaded image preview
  vm.preview_img = {};
  $scope.uploadChange = function (element, position) {
    if (position === 'footer') {
      vm.fileReqFooter = '';
    } else if (position === 'sidebar') {
      vm.fileReqSidebar = '';
    } else if (position === 'header') {
      vm.fileReqHeader = '';
    }
    var reader = new FileReader();
    reader.readAsDataURL(element.files[0]);
    reader.onload = function (e) {
      vm.preview_img[position] = e.target.result;
      var elmId = 'logo_preview_' + position;
      $document[0].getElementById(elmId).src = e.target.result;
    };
  };

  vm.count = 1;
  vm.publish_ads2 = function () {
    //  lm.$emit(Status.PROCESSING, Status.PROCESSING_MSG);

    var sideImage = vm.sideImage;
    var headerImage = vm.headerImage;
    var footerImage = vm.footerImage;

    vm.validAds = [];
    var validation = 1;
    var noFormEntry = 1;
    if (angular.isUndefined(vm.sideImage) && angular.isDefined(vm.weblinkSidebar)) {
      vm.fileReqSidebar = 'choose-file-req';
      vm.fileReqMsgSidebar = 'Upload an image';
      vm.adsFormInit.weblinkSidebar = 1;
      validation *= 0;
      noFormEntry *= 0;
      // vm.weblinkFooter = '';
    } else if (angular.isDefined(vm.sideImage) && angular.isUndefined(vm.weblinkSidebar)) {
      vm.fileReqSidebar = '';
      vm.fileReqMsgSidebar = '';
      vm.adsFormInit.weblinkSidebar = 0;
      //  return;
      validation *= 0;
      noFormEntry *= 0;
    }

    if (angular.isDefined(vm.sideImage) && angular.isDefined(vm.weblinkSidebar)) {
      vm.fileReqMsgSidebar = '';
      vm.validAds.push('sidebar');
      validation *= 1;
      noFormEntry *= 0;
    } else if (angular.isUndefined(vm.sideImage) && angular.isUndefined(vm.weblinkSidebar)) {
      // validation *= 0;
      noFormEntry *= 1;
    }

    if (angular.isUndefined(vm.headerImage) && angular.isDefined(vm.weblinkHeader)) {
      headerImage = '';
      vm.adsFormInit.weblinkHeader = 1;
      vm.fileReqHeader = 'choose-file-req';
      vm.fileReqMsgHeader = 'Upload an image';
      //  return;
      validation *= 0;
      noFormEntry *= 0;
      // vm.adsFormInit.weblinkHeader = 0;
      // vm.weblinkFooter = '';
    } else if (angular.isUndefined(vm.weblinkHeader) && angular.isDefined(vm.headerImage)) {
      vm.adsFormInit.weblinkHeader = 0;
      vm.fileReqHeader = '';
      vm.fileReqMsgHeader = '';
      //  return;
      validation *= 0;
      noFormEntry *= 0;
    }
    if (angular.isDefined(vm.headerImage) && angular.isDefined(vm.weblinkHeader)) {
      vm.fileReqMsgHeader = '';
      vm.adsFormInit.weblinkHeader = 1;
      vm.validAds.push('header');
      validation *= 1;
      noFormEntry *= 0;
      // vm.weblinkHeader = '';
    } else if (angular.isUndefined(vm.headerImage) && angular.isUndefined(vm.weblinkHeader)) {
      // validation *= 0;
      noFormEntry *= 1;
    }

    if (angular.isUndefined(vm.footerImage) && angular.isDefined(vm.weblinkFooter)) {
      footerImage = '';
      vm.fileReqFooter = 'choose-file-req';
      vm.fileReqMsgFooter = 'Upload an image';
      vm.adsFormInit.weblinkFooter = 1;
      //  return;
      validation *= 0;
      noFormEntry *= 0;
      // vm.adsFormInit.weblinkFooter = 0;
      // vm.weblinkFooter = '';
    } else if (angular.isUndefined(vm.weblinkFooter) && angular.isDefined(vm.footerImage)) {
      vm.adsFormInit.weblinkFooter = 0;
      vm.fileReqFooter = '';
      vm.fileReqMsgFooter = '';
      //  return;
      validation *= 0;
      noFormEntry *= 0;
    }
    if (angular.isDefined(vm.footerImage) && angular.isDefined(vm.weblinkFooter)) {
      vm.fileReqMsgFooter = '';
      vm.adsFormInit.weblinkFooter = 1;
      vm.validAds.push('footer');
      validation *= 1;
      noFormEntry *= 0;
    } else if (angular.isUndefined(vm.footerImage) && angular.isUndefined(vm.weblinkFooter)) {
      // validation *= 0;
      noFormEntry *= 1;
    }
    $log.info(vm.publishAdsForm.weblinkFooter.$error.pattern);
    if ((noFormEntry === 0 && validation === 0) || (vm.publishAdsForm.weblinkFooter.$error.pattern === true || vm.publishAdsForm.weblinkSidebar.$error.pattern === true || vm.publishAdsForm.weblinkHeader.$error.pattern === true)) {
      $log.info('validation error');
      return;
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
    // $log.info(vm.validAds.length);
    if (vm.validAds.length === 0) {
      // $state.go(UIState.MY_PROFILE.UPDATE_ADS);
      // $state.go(UIState.MY_PROFILE.SPONSORED_PAGE);
      vm.checkSponsorGo();
    }
    // return;
    // vm.submitAds(sideImage, 'sidebar', vm.weblinkSidebar);
    // vm.submitAds(headerImage, 'header', vm.weblinkHeader);
    // vm.submitAds(footerImage, 'footer', vm.weblinkFooter);
  };

  var bannerAdded = 0;
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
    service.publishAds(formData).then(function (result) {
      //  lm.$emit(Status.SUCCEEDED, 'Ads submitted');
      if (vm.count >= vm.validAds.length) {
        // if (vm.count >= 3) {
        lm.$emit(Status.SUCCEEDED, 'Ads submitted');
        // saving steps data //
        // signupData.signupStep.publishAds[(vm.count - 1).toString()] = publishAds;
        //  localStorageService.set('signupStepsData', signupData, 'sessionStorage');
        // bannerAdded = 1;
        // check if sponsorAds are added or not
        // vm.checkSponsorGo();
        vm.goHome();
      }
      vm.count++;
    }).catch(function (err) {
      $log.info(err);
      vm.count--;
      lm.$emit(Status.FAILED, 'Something went wrong');
    });
  };

  vm.checkSponsorGo = function () {
    // setting publishAds as added for current center
    if (bannerAdded === 1) {
      localStorageService.set('bannerAdded', '1');
    }
    var sponsorAdsVisited = localStorageService.get('sponsorAdded');
    if (angular.isDefined(sponsorAdsVisited) && sponsorAdsVisited === '0') {
      $state.go(UIState.MY_PROFILE.SPONSER);
    } else {
      $state.go(UIState.MY_PROFILE.SPONSER);
      //  $state.go(UIState.MY_PROFILE.DETAILS);
    }
  };

  vm.populateValues = function () {
    $log.info(vm.adsInfo);
    if (angular.isDefined(vm.adsInfo) && angular.isDefined(vm.adsInfo[0])) {
      var publishAds = vm.adsInfo;
      for (var key in publishAds) {
        var adPos = publishAds[key].name.split(' ');
        adPos = adPos[1];
        if (adPos === 'header') {
          vm.weblinkHeader = 'www.dummyheaderlink.com'; // publishAds[key].name;
          // vm.headerImage = '';
        }
        if (adPos === 'sidebar') {
          vm.weblinkSidebar = 'www.dummysidebarlink.com'; // publishAds[key].center_web_link;
          // vm.sideImage = '';
        }
        if (adPos === 'footer') {
          vm.weblinkFooter = 'www.dummyfooterlink.com';
          // vm.footerImage = '';
        }
      }
    } else {
      $log.info('couldnot get ads info.');
      // vm.goHome();
    }
  };
  vm.populateValues();

  vm.goBack = function () {
    $state.go(UIState.MY_PROFILE.SPONSER);
  };
  vm.goToCart = function () {
    $state.go(UIState.MY_PROFILE.DETAILS);
  };
}
