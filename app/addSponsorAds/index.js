var angular = require('angular'),
    ctrl = require('./ctrl'),
    htmlTemplate = require('./view.html'),
    service = require('./service'),
    moduleName = 'app.addSponsorAds';

angular.module(moduleName, [
        'ngRoute',
        require('../user'),
        require('../components')
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/add-sponsor-ads/', {
            template: htmlTemplate,
            controller: 'addSponsorAdsCtrl'
        });
    }])
    .factory('addSponsorAdsService', service)
    .controller('addSponsorAdsCtrl', ctrl);

module.exports = moduleName;