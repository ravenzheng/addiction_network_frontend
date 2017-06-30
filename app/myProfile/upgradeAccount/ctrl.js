module.exports = ['$state', 'UIState', '$rootScope', 'localStorageService', ctrl];

function ctrl($state, UIState, $rootScope, localStorageService) {
  var vm = this;
  var membershipType = localStorageService.get('membershipType', 'sessionStorage');
  if (membershipType !== 'free') {
    $state.go(UIState.MY_PROFILE.PAYMENT_DETAILS_ADD);
  }
  vm.payment = function (type) {
    $rootScope.membershipType = type;
    localStorageService.set('membershipType', type, 'sessionStorage');
    $state.go(UIState.MY_PROFILE.PAYMENT_DETAILS_ADD);
  };
}
