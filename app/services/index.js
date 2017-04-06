var moduleName = 'app.services';

angular.module(moduleName, [])
  .service('UserService', require('./userService'))
  .factory('AdvertisementService', require('./advertisementService'))
  .factory('MapService', require('./mapService'))
  .factory('TreatmentCenterService', require('./treatmentCenterService'))
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(require('./dataInterceptor'));
  }]);

module.exports = moduleName;
