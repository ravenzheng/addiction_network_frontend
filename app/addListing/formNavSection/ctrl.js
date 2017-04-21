module.exports = ['UIState', ctrl];

function ctrl(UIState) {
  var vm = this;
  vm.step1 = 1;
  vm.step2 = 0;
  vm.step3 = 0;

  vm.links = [{
    uiSref: UIState.ADD_LISTING.CONTACT_INFO,
    name: 'Contact'
  }, {
    uiSref: UIState.ADD_LISTING.USER_INFO,
    name: 'User Info'
  }, {
    uiSref: UIState.ADD_LISTING.CENTER_INFO,
    name: 'Treatment Center'
  }, {
    uiSref: UIState.ADD_LISTING.CENTER_DETAILS,
    name: 'Treatment Center Details'
  }, {
    uiSref: UIState.ADD_LISTING.CENTER_DETAILS,
    name: 'Paid member'
  }, {
    uiSref: UIState.ADD_LISTING.CENTER_DETAILS,
    name: 'Payemnt'
  }, {
    uiSref: UIState.ADD_LISTING.CENTER_DETAILS,
    name: 'Sponsored pages'
  }, {
    uiSref: UIState.ADD_LISTING.CENTER_DETAILS,
    name: 'Banner Ads'
  }, {
    uiSref: UIState.ADD_LISTING.CENTER_DETAILS,
    name: 'Featured Listing'
  }];
}
