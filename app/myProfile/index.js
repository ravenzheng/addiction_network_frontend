var angular = require('angular'),
  moduleName = 'app.myProfile';

angular.module(moduleName, [
  'ui.router',
  require('../components'),
  require('../services')
]).component('thumbnailDelete', require('./sub/thumbnailDelete'))
  .component('centerTable', require('./sub/centerTable'))
  .component('pagination', require('./sub/pagination'))
  .component('profileMain', require('./profileMain'))
  .component('accountSettings', require('./accountSettings'))
  .component('changePassword', require('./changePassword'))
  .component('myTreatmentCenters', require('./myTreatmentCenters'))
  .component('addTreatmentCenter', require('./addTreatmentCenter'))
  .component('editTreatmentCenter', require('./editTreatmentCenter'))
  .component('bannerAds', require('./bannerAds'))
  .component('bannerAdsAdd', require('./bannerAds/add'))
  .component('bannerAdsEdit', require('./bannerAds/edit'))
  .component('bannerAdsView', require('./bannerAds/view'))
  .filter('urlFilter', require('./urlFilter'))
  .component('myProfile', {
    template: require('./view.html'),
    controller: require('./ctrl')
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'myProfile',
      url: '/my-profile',
      abstract: true,
      template: '<my-profile></my-profile>'
    });
    $stateProvider.state({
      name: 'myProfile.index',
      url: '/index',
      template: '<profile-main profile="$ctrl.profile"></profile-main>'
    });
    $stateProvider.state({
      name: 'myProfile.accountSettings',
      url: '/account-settings',
      template: '<account-settings profile="$ctrl.profile"></account-settings>'
    });
    $stateProvider.state({
      name: 'myProfile.changePassword',
      url: '/change-password',
      template: '<change-password></change-password>'
    });
    $stateProvider.state({
      name: 'myProfile.myTreatmentCenters',
      url: '/my-treatment-centers',
      template: '<my-treatment-centers></my-treatment-centers>'
    });
    $stateProvider.state({
      name: 'myProfile.addTreatmentCenter',
      url: '/add-treatment-center',
      template: '<add-treatment-center></add-treatment-center>'
    });
    $stateProvider.state({
      name: 'myProfile.editTreatmentCenter',
      url: '/edit-treatment-center/:id',
      template: '<edit-treatment-center></edit-treatment-center>'
    });
    $stateProvider.state({
      name: 'myProfile.bannerAds',
      url: '/banner-ads',
      template: '<banner-ads></banner-ads>'
    });
    $stateProvider.state({
      name: 'myProfile.bannerAdsAdd',
      url: '/banner-ads/add-banner',
      template: '<banner-ads-add></banner-ads-add>'
    });
    $stateProvider.state({
      name: 'myProfile.bannerAdsEdit',
      url: '/banner-ads/edit-banner/:id',
      template: '<banner-ads-edit></banner-ads-edit>'
    });
    $stateProvider.state({
      name: 'myProfile.bannerAdsView',
      url: '/banner-ads/view-banner/:id',
      template: '<banner-ads-view></banner-ads-view>'
    });
  }]);

module.exports = moduleName;
