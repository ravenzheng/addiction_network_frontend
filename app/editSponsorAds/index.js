var angular = require('angular'),
    ctrl = require('./ctrl'),
    htmlTemplate = require('./view.html'),
    service = require('./service'),
    moduleName = 'app.editSponsorAds';

angular.module(moduleName, [
        'ngRoute',
        require('../user'),
        require('../components')
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/sponsor-ads-edit/:id/:title/:name/:description/:website', {
            template: htmlTemplate,
            controller: 'editSponsorAdsCtrl'
        });
    }])
    .factory('editSponsorAdsService', service)
    .controller('editSponsorAdsCtrl', ctrl);

module.exports = moduleName;