var moduleName = 'app.components';

angular.module(moduleName, [])
  .constant('Status', require('./statusConstants'))
  .constant('states', require('./states.json'))
  .constant('mapConfig', require('./map.json'))
  .component('statusView', require('./statusView'))
  .component('cardHeading', require('./cardHeading'))
  .component('emptyListError', require('./emptyListError'))
  .component('footerAd', require('./footerAd'))
  .component('profileNavSection', require('./profileNavSection'))
  .component('sectionHeading', require('./sectionHeading'))
  .component('sponsAdsCategories', require('./sponsAdsCategories'))
  .component('sponsListIds', require('./sponsListIds'))
  .component('stateSelect', require('./stateSelect'))
  .component('stateMap', require('./stateMap'))
  .directive('fileModel', require('./fileModel'))
  .directive('validPasswordC', require('./validPasswordC'));

module.exports = moduleName;
