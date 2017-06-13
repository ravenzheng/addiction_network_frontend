module.exports = ['$rootScope', '$log', '$state', 'UIState', 'localStorageService', ctrl];

function ctrl($rootScope, $log, $state, UIState, localStorageService) {
  // todo
  var lm = this;
  lm.previous = function () {
    $state.go(UIState.ADD_LISTING.USER_INFO);
  };
  lm.finish = function () {
    $rootScope.addListingStepDone = 0;
    $state.go(UIState.LOGIN);
  };

  $rootScope.activeLink = 'Membership';
  lm.sponsored = function () {
    $rootScope.addListingStepDone = 3;
    $rootScope.membershipType = 'sponsored';
    localStorageService.set('membershipType', $rootScope.membershipType, 'sessionStorage');
    $rootScope.doneSteps = $rootScope.doneSteps.concat(['paidMember']);
    $rootScope.centerReset = 0;
    $rootScope.showSteps = ['contactInfo', 'userInfo', 'paidMember', 'centerInfo', 'centerDetails', 'paymentDetails', 'sponsoredPage', 'bannerAd', 'featuredListing'];
    setMembershipType('sponsored');
    $state.go(UIState.ADD_LISTING.CENTER_INFO);
  };
  lm.featured = function () {
    $rootScope.addListingStepDone = 3;
    $rootScope.membershipType = 'featured';
    localStorageService.set('membershipType', $rootScope.membershipType, 'sessionStorage');
    $rootScope.doneSteps = $rootScope.doneSteps.concat(['paidMember']);
    $rootScope.centerReset = 0;
    $rootScope.showSteps = ['contactInfo', 'userInfo', 'paidMember', 'centerInfo', 'centerDetails', 'paymentDetails', 'sponsoredPage', 'bannerAd', 'featuredListing'];
    setMembershipType('featured');
    $state.go(UIState.ADD_LISTING.CENTER_INFO);
  };
  lm.freeSignup = function () {
    $rootScope.addListingStepDone = 3;
    $rootScope.membershipType = 'free';
    localStorageService.set('membershipType', $rootScope.membershipType, 'sessionStorage');
    $rootScope.doneSteps = $rootScope.doneSteps.concat(['paidMember']);
    $rootScope.centerReset = 0;
    $rootScope.showSteps = ['contactInfo', 'userInfo', 'paidMember', 'centerInfo', 'centerDetails'];
    $state.go(UIState.ADD_LISTING.CENTER_INFO);
  };

  function setMembershipType(type) {
    localStorageService.set('membershipType', type, 'sessionStorage');
  }
}
