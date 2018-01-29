module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'localStorageService', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, localStorageService) {
  var vm = this;

  //var curCenter = localStorageService.get('current_center');
  //  if(angular.isDefined(curCenter)){
  //    curCenter = curCenter.id;
  //  localStorageService.set('sponsorPages','0');

  //  }
  vm.sponsorAdded = localStorageService.get('sponsorAdded');
  vm.bannerAdded = localStorageService.get('bannerAdded');
  if (angular.isUndefined(vm.sponsorAdded) || vm.sponsorAdded === null) {
    localStorageService.set('sponsorAdded', '0');
    localStorageService.set('bannerAdded', '0');
  }

  vm.publish_ads = function () {
    $state.go(UIState.SIGN_UP.PUBLISH_ADS);
  };
  vm.add_sponsor = function () {
    $state.go(UIState.SIGN_UP.SPONSORED_PAGE);
  };
  vm.goBack = function () {
    $state.go(UIState.SIGN_UP.UPDATE_MEMBERSHIP);
  };
  vm.goToCart = function () {
    $state.go(UIState.SIGN_UP.DETAILS);
  };
}