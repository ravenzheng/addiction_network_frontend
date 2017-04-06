var internalLinks = [{
  uiSref: 'home',
  name: 'Home'
}, {
  uiSref: 'treatmentCenterMap.index',
  name: 'Treatment Centers'
}, {
  uiSref: 'aboutUs',
  name: 'About Us'
}, {
  uiSref: 'blog',
  name: 'Blog'
}, {
  uiSref: 'contactUs',
  name: 'Contact Us'
}, {
  uiSref: 'centerDetail',
  name: 'Add Listing'
}, {
  uiSref: 'logout',
  name: 'Logout',
  id: 'adic-logout'
}, {
  uiSref: 'myProfile.index',
  name: 'My Profile',
  id: 'adic-my-profile'
}];

var internalLinksNoAuth = [{
  uiSref: 'home',
  name: 'Home'
}, {
  uiSref: 'treatmentCenterMap.index',
  name: 'Treatment Centers'
}, {
  uiSref: 'aboutUs',
  name: 'About Us'
}, {
  uiSref: 'blog',
  name: 'Blog'
}, {
  uiSref: 'contactUs',
  name: 'Contact Us'
}, {
  uiSref: 'centerDetail',
  name: 'Add Listing'
}, {
  uiSref: 'login',
  name: 'Login',
  id: 'adic-login'
}];

var socialLinks = [{
  href: 'https://www.facebook.com/theaddictionnetwork',
  img: 'themes/addiction/images/fb-2.png'
}, {
  href: 'https://twitter.com/AddictionNet1',
  img: 'themes/addiction/images/twitter-ff-2.png'
}, {
  href: 'https://www.google.com/+Addictionnetwork1',
  img: 'themes/addiction/images/gglplus.png'
}];

function HeaderCtrl($log, $scope, $rootScope, localStorageService) {
  /* todo */
  this.socialLinks = socialLinks;
  this.internalLinks = internalLinks;
  this.internalLinksNoAuth = internalLinksNoAuth;
  $scope.$on('$stateChangeStart',
    function (event, toState, toParams, fromState) {
      var token = localStorageService.get('token');
      if (token) {
        $rootScope.login = 1;
      } else {
        var tostate = toState.name.split('.');
        $log.error('tostate: ' + tostate[0] + ' -->' + fromState.name);
        if (tostate[0] === 'myProfile') {
          event.preventDefault();
        }
      }
    });
}

module.exports = {
  template: require('./view.html'),
  controller: HeaderCtrl
};

HeaderCtrl.$inject = ['$log', '$scope', '$rootScope', 'localStorageService'];
