function ctrl($window, $log, UserService, $rootScope, localStorageService) {
  $rootScope.login = 0;
  localStorageService.remove('token');
  localStorageService.remove('addListingBannerAds');
  localStorageService.remove('addListingSponsoredPage');
  localStorageService.remove('addListingCenterDetails');
  localStorageService.remove('addListingCanSkip');
  localStorageService.remove('addListingCenterInfo');
  localStorageService.remove('addListingNavigation');
  localStorageService.remove('addListingPaymentDetail');
  localStorageService.remove('addListingSponsoredPage');
  localStorageService.remove('addListingUserInfo');
  localStorageService.remove('userInfo');
  localStorageService.remove('signupToken');
  $window.location.href = '/#/login';
}

module.exports = ['$window', '$log', 'UserService', '$rootScope', 'localStorageService', ctrl];
