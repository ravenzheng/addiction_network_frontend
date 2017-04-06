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
  uiSref: 'blogPage',
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
  name: 'Blog',
  id: 'blog'
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

function HeaderCtrl($log, $scope, $rootScope, $document, $window, localStorageService) {
  /* todo */
  this.socialLinks = socialLinks;
  this.internalLinks = internalLinks;
  this.internalLinksNoAuth = internalLinksNoAuth;
  $scope.$on('$stateChangeStart',
    function (event, toState, toParams, fromState) {
      var token = localStorageService.get('token');
      var tostate = toState.name.split('.');
      if (tostate[0] === 'blog') {
        $window.location = 'http://www.addictionnetwork.com/blog/?angular_ads=advertisement';
      }
      if (token) {
        $rootScope.login = 1;
      } else {
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

HeaderCtrl.$inject = ['$log', '$scope', '$rootScope', '$document', '$window', 'localStorageService'];
