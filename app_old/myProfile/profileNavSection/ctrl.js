module.exports = ['$rootScope', 'UIState', ctrl];

function ctrl($rootScope, UIState) {
  var vm = this;
  vm.linksPaid = [{
    uiSref: UIState.MY_PROFILE.PROFILE,
    name: 'My Profile'
  }, {
    uiSref: UIState.MY_PROFILE.CHANGE_PASSWORD,
    name: 'Change Password'
  }, {
    uiSref: UIState.MY_PROFILE.PAYMENT_DETAILS,
    name: 'Payment Details'
  }, {
    uiSref: UIState.MY_PROFILE.TEST_CENTER_DETAILS,
    name: 'Test Center & Details'
  }];

  vm.linksFree = [{
    uiSref: UIState.MY_PROFILE.PROFILE,
    name: 'My Profile'
  }, {
    uiSref: UIState.MY_PROFILE.CHANGE_PASSWORD,
    name: 'Change Password'
  },
  // {
  //   uiSref: UIState.MY_PROFILE.UPGRADE_ACCOUNT,
  //   name: 'Upgrade Account'
  // },
  {
    uiSref: UIState.MY_PROFILE.TEST_CENTER_DETAILS,
    name: 'Test Center & Details'
  }];
}
