var angular = require('angular'),
  moduleName = 'app.services';

angular.module(moduleName, [])
  .service('UserService', require('./userService'))
  .factory('TreatmentCenterService', require('./treatmentCenterService'))
  .factory('SponsorAdsService', require('./sponsorAdsService'))
  .factory('AdvertisementService', require('./advertisementService'))
  .factory('ComponentsService', require('./componentsService'));

module.exports = moduleName;
