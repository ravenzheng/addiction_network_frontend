var angular = require('angular'),
    ctrl = require('./ctrl'),
    htmlTemplate = require('./view.html'),
    service = require('./service'),
    moduleName = 'app.addTreatmentCenterSignUp';

angular.module(moduleName, [
        'ngRoute',
        require('../components')
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/center-detail/', {
            template: htmlTemplate,
            controller: 'AddTreatmentCenterCtrlSignUp'
        });
    }])
    .factory('addTreatmentCenterSignUpService', service)
    .controller('AddTreatmentCenterCtrlSignUp', ctrl);
module.exports = moduleName;