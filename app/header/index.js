var UIState = require('../components/uiStateConstants');

var internalLinks = [{
  uiSref: UIState.HOME,
  name: 'Home'
}, {
  uiSref: UIState.CENTER_MAP.MAP,
  name: 'Treatment Centers'
}, {
  uiSref: UIState.ABOUT_US,
  name: 'About Us'
}, {
  uiSref: UIState.BLOG,
  name: 'Blog'
}, {
  uiSref: UIState.CONTACT_US,
  name: 'Contact Us'
}, {
  uiSref: UIState.MY_PROFILE.PROFILE,
  name: 'My Profile'
}, {
  uiSref: UIState.LOGOUT,
  name: 'Logout'
}];

var internalLinksNoAuth = [{
  uiSref: UIState.HOME,
  name: 'Home'
}, {
  uiSref: UIState.CENTER_MAP.MAP,
  name: 'Treatment Centers'
}, {
  uiSref: UIState.ABOUT_US,
  name: 'About Us'
}, {
  uiSref: UIState.BLOG,
  name: 'Blog'
}, {
  uiSref: UIState.CONTACT_US,
  name: 'Contact Us'
}, {
  uiSref: UIState.ADD_LISTING,
  name: 'Add Listing'
}, {
  uiSref: UIState.LOGIN,
  name: 'Login'
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

function HeaderCtrl($log, $scope, $rootScope, $window, localStorageService) {
  /* todo */
  this.socialLinks = socialLinks;
  this.internalLinks = internalLinks;
  this.internalLinksNoAuth = internalLinksNoAuth;
  $scope.$on('$stateChangeStart',
    function (event, toState) {
      var token = localStorageService.get('token');
      var tostate = toState.name.split('.');
      if (tostate[0] === 'blog') {
        $window.location = 'http://www.addictionnetwork.com/blog/?angular_ads=advertisement';
      }
      if (token) {
        $rootScope.login = 1;
      } else if (tostate[0] === 'myProfile') {
        $window.location.href = '/#/login';
        // $log.error('tostate: ' + tostate[0] + ' -->' + fromState.name);
        event.preventDefault();
      }
    });
}

module.exports = {
  template: require('./view.html'),
  controller: HeaderCtrl
};

HeaderCtrl.$inject = ['$log', '$scope', '$rootScope', '$window', 'localStorageService'];
