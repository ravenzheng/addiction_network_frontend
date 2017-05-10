var moduleName = 'app.services';

angular.module(moduleName, [])
  .service('UserService', require('./userService'))
  .factory('AdvertisementService', require('./advertisementService'))
  .factory('CartDetailService', require('./cartDetailService'))
  .factory('PaymentService', require('./paymentService'))
  .factory('MapService', require('./mapService'))
  .factory('TreatmentCenterService', require('./treatmentCenterService'))
  .factory('SponsorService', require('./sponsorAdsService'))
  .factory('SliderService', require('./sliderService'))
  .factory('FeaturedService', require('./featuredListingService'))
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(require('./dataInterceptor'));
  }]);

module.exports = moduleName;
