module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'SignUpService', 'localStorageService', 'Status', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, service, localStorageService, Status) {
  var vm = this;
  var lm = $rootScope;
  var token = localStorageService.get('signupToken');
  var centerId = localStorageService.get('signupCenterId');
  vm.count = 1;
  vm.publish_ads2 = function () {
    lm.$emit(Status.PROCESSING, Status.PROCESSING_MSG);
  //  $state.go(UIState.SIGN_UP.PUBLISH_ADS2);
    var sideImage = vm.sideImage;
    var headerImage = vm.headerImage;
    var footerImage = vm.footerImage;

    if (angular.isUndefined(vm.sideImage)) {
      sideImage = '';
    }
    if (angular.isUndefined(vm.headerImage)) {
      headerImage = '';
    }
    if (angular.isUndefined(vm.footerImage)) {
      footerImage = '';
    }

    vm.submitAds(sideImage, 'sidebar', vm.weblinkSidebar);
    vm.submitAds(headerImage, 'header', vm.weblinkHeader);
    vm.submitAds(footerImage, 'footer', vm.weblinkFooter);
  };

  vm.submitAds = function (content, position, weblink) {
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
      if (vm.count >= 3) {
        lm.$emit(Status.SUCCEEDED, 'Ads submitted');
        $state.go(UIState.SIGN_UP.PUBLISH_ADS2);
      }
      vm.count++;
    }).catch(function (err) {
      $log.info(err);
      vm.count--;
      lm.$emit(Status.SUCCEEDED, 'Something went wrong');
    });
  };
}
