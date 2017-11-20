module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'localStorageService', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, localStorageService) {
  var vm = this;
  vm.signUp = function () {
    $state.go(UIState.SIGN_UP.USER_CREATE);
  };

  vm.resetPreviousVars = function () {
    // reset previous localstorage
    localStorageService.remove('membership', 'center_added', 'userInfo', 'signupSponsoredPage', 'membershipType', 'bannerAdded', 'sponsorAdded');
  };
  vm.resetPreviousVars();

}
