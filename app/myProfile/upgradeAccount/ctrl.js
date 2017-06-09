module.exports = ['$state', 'UIState', ctrl];

function ctrl($state, UIState) {
  var vm = this;
  vm.payment = function () {
    $state.go(UIState.MY_PROFILE.PAYMENT_DETAILS_ADD);
  };
}
