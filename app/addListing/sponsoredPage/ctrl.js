module.exports = ['$rootScope', '$log', '$state', 'UIState', ctrl];

function ctrl($rootScope, $log, $state, UIState) {
  // todo
  // console.log('contact info');
  var vm = $rootScope; // this;
  var lm = this;
  // $rootScope.activeLink = ['Contact'];
  $rootScope.activeLink = 'Sponsored Pages';
  lm.previous = function () {
    $state.go(UIState.ADD_LISTING.PAYMENT_DETAILS);
  };
  lm.saveStep1 = function () {
    $rootScope.contactInfo = {
      'first_name': vm.first_name,
      'last_name': vm.last_name,
      'company': vm.company,
      'phone': vm.phone
    };
    $state.go(UIState.ADD_LISTING.BANNER_ADS);
  };
}
