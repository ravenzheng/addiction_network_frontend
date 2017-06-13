module.exports = ['$state', 'UIState', '$rootScope', 'localStorageService', ctrl];

function ctrl($state, UIState, $rootScope, localStorageService) {
  var vm = this;
  vm.payment = function (type) {
    $rootScope.membershipType = type;
    localStorageService.set('membershipType', type, 'sessionStorage');
    $state.go(UIState.MY_PROFILE.PAYMENT_DETAILS_ADD);
  };
}
