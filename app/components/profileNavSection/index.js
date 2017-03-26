var links = [{
  href: '#/my-profile',
  name: 'My Profile'
}, {
  href: '#/account-settings',
  name: 'Account Settings'
}, {
  href: '#/change-password',
  name: 'Change Password'
}, {
  href: '#/my-treatment-centers',
  name: 'My Treatment Centers'
}, {
  href: '#/sponsor-ads',
  name: 'Sponsor Pages'
}, {
  href: '#/banner-ads',
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
}
