var moduleName = 'app.SignUpWelcome';

angular.module(moduleName, ['ui.router'])
.component('welcomesignup', require('./welcomeSignup'))
.component('usercreate', require('./UserCreate'))
.component('userprofile', require('./userProfile'))
.component('testcenter', require('./testCenter'))
.component('optionalfields', require('./optionalFields'))
.component('updatemembership', require('./updateMembership'))
.component('sponserpage', require('./sponserPage'))
.component('publishads', require('./publishAds'))
.component('publishads2', require('./publishAds2'))
.component('signup', {
  template: require('./view.html'),
  controller: require('./ctrl')
})
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.SIGN_UP.INDEX,
      url: '/signup',
      abstract: true,
      template: '<signup></signup>'
    });
    $stateProvider.state({
      name: UIState.SIGN_UP.WELCOME,
      url: '/welcome',
      template: '<welcomesignup></welcomesignup>'
    });
    $stateProvider.state({
      name: UIState.SIGN_UP.USER_CREATE,
      url: '/user_create',
      template: '<usercreate></usercreate>'
    });
    $stateProvider.state({
      name: UIState.SIGN_UP.USER_PROFILE,
      url: '/user_profile',
      template: '<userprofile></userprofile>'
    });
    $stateProvider.state({
      name: UIState.SIGN_UP.TEST_CENTER,
      url: '/treatmentcenter_createcenter',
      template: '<testcenter></testcenter>'
    });
    $stateProvider.state({
      name: UIState.SIGN_UP.OPTIONAL_FIELDS,
      url: '/treatment_center_update_option',
      template: '<optionalfields></optionalfields>'
    });
    $stateProvider.state({
      name: UIState.SIGN_UP.UPDATE_MEMBERSHIP,
      url: '/updatemembership',
      template: '<updateMembership></updateMembership>'
    });
    $stateProvider.state({
      name: UIState.SIGN_UP.SPONSER,
      url: '/sponser_page',
      template: '<sponserPage></sponserPage>'
    });
    $stateProvider.state({
      name: UIState.SIGN_UP.PUBLISH_ADS,
      url: '/publish_ads',
      template: '<publishads></publishads>'
    });
    $stateProvider.state({
      name: UIState.SIGN_UP.PUBLISH_ADS2,
      url: '/publish_ads_2',
      template: '<publishads2></publishads2>'
    });
  }]);

module.exports = moduleName;
