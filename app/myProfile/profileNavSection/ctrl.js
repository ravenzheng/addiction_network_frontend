module.exports = ['$rootScope', 'UIState', ctrl];

function ctrl($rootScope, UIState) {
  var vm = this;
  vm.linksPaid = [{
    uiSref: UIState.MY_PROFILE.PROFILE,
    name: 'My Profile'
  }, {
    uiSref: UIState.MY_PROFILE.ACCOUNT_SETTING,
    name: 'Account Settings'
  }, {
    uiSref: UIState.MY_PROFILE.CHANGE_PASSWORD,
    name: 'Change Password'
  }, {
    uiSref: UIState.MY_PROFILE.MY_CENTERS,
    name: 'My Treatment Centers'
  }, {
    uiSref: UIState.MY_PROFILE.SPONSOR_ADS,
    name: 'Sponsor Pages'
  }, {
    uiSref: UIState.MY_PROFILE.BANNER_ADS,
    name: 'Banner Ads'
  }, {
    uiSref: UIState.MY_PROFILE.PAYMENT_DETAILS,
    name: 'Payment Details'
  }];
  vm.linksFree = [{
    uiSref: UIState.MY_PROFILE.PROFILE,
    name: 'My Profile'
  }, {
    uiSref: UIState.MY_PROFILE.ACCOUNT_SETTING,
    name: 'Account Settings'
  }, {
    uiSref: UIState.MY_PROFILE.CHANGE_PASSWORD,
    name: 'Change Password'
  }, {
    uiSref: UIState.MY_PROFILE.MY_CENTERS,
    name: 'My Treatment Centers'
  }, {
    uiSref: UIState.MY_PROFILE.COMING_SOON,
    name: 'Upgrade Account'
  }];
}
