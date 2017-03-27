var angular = require('angular'),
    moduleName = 'app.BannerAds';
angular.module(moduleName, [
        'ui.router',
        require('../components')
    ])
    .factory('AdvertisementService', require('../services/advertisementService'))
    .component('bannerAdsListMain', require('./list/main'))
    .component('bannerAdsList', {
        template: require('./list/view.html'),
        controller: 'BannerAdsCtrl' //require('./ctrl')
    })
    .component('bannerAdsAddMain', require('./add/main'))
    .component('bannerAdsAdd', {
        template: require('./add/view.html'),
        controller: 'BannerAdsCtrl' //require('./ctrl')
    })
    .component('bannerAdsEditMain', require('./edit/main'))
    .component('bannerAdsEdit', {
        template: require('./edit/view.html'),
        //controller: require('./ctrl')
    })
    .component('bannerAdsViewMain', require('./view/main'))
    .component('bannerAdsView', {
        template: require('./view/view.html')
        //controller: require('./ctrl')
    })
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state({
            name: 'bannerAdsList',
            url: '/banner-ads',
            template: '<banner-ads-list></banner-ads-list>'
        }).state({
            name: 'bannerAdsAdd',
            url: '/banner-ads-add',
            template: '<banner-ads-add></banner-ads-add>'
        }).state({
            name: 'bannerAdsEdit',
            url: '/banner-ads-edit/:id',
            template: '<banner-ads-edit></banner-ads-edit>'
        }).state({
            name: 'bannerAdsView',
            url: '/banner-ads-view/:id',
            template: '<banner-ads-view></banner-ads-view>'
        });
    }])

    .controller('BannerAdsCtrl', require('./list/ctrl'));

module.exports = moduleName;