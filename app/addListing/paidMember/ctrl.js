module.exports = ['$rootScope', '$log', '$state', 'UIState', ctrl];

function ctrl($rootScope, $log, $state, UIState) {
  // todo
  // console.log('contact info');
  var vm = $rootScope; // this;
  var lm = this;
  lm.previous = function () {
    $state.go(UIState.ADD_LISTING.CENTER_DETAILS);
  };
  // $rootScope.activeLink = ['Contact'];
  $rootScope.activeLink = 'Paid Member';
  vm.submit = function () {
    $state.go(UIState.ADD_LISTING.PAYMENT_DETAILS);
  };
}
