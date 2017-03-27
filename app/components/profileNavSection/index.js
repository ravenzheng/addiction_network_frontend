var links = [{
  uiSref: 'myProfile',
  name: 'My Profile'
}, {
  uiSref: 'accountSettings',
  name: 'Account Settings'
}, {
  uiSref: 'changePassword',
  name: 'Change Password'
}, {
  uiSref: 'myTreatmentCenters',
  name: 'My Treatment Centers'
}, {
  uiSref: 'sponsorAds',
  name: 'Sponsor Pages'
}, {
  href: '#/banner-ads',
  uiSref: 'advertisement',
  name: 'Banner Ads'
}];

function ProfileNavSectionCtrl() {
  var vm = this;
  vm.links = links;
}

module.exports = {
  template: require('./view.html'),
  controller: ProfileNavSectionCtrl,
  bindings: {
    'profilePic': '<'
  }
};
