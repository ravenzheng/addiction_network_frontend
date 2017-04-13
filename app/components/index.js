var moduleName = 'app.components';

angular.module(moduleName, [])
  .constant('states', require('./states.json'))
  .constant('mapConfig', require('./map.json'))
  .constant('Status', require('./statusConstants'))
  .constant('UIState', require('./uiStateConstants'))
  .component('statusView', require('./statusView'))
  .component('cardHeading', require('./cardHeading'))
  .component('emptyListError', require('./emptyListError'))
  .component('footerAd', require('./footerAd'))
  .component('sectionHeading', require('./sectionHeading'))
  .component('sponsAdsCategories', require('./sponsAdsCategories'))
  .component('sponsListIds', require('./sponsListIds'))
  .component('stateSelect', require('./stateSelect'))
  .component('stateMap', require('./stateMap'))
  .directive('fileModel', require('./fileModel'))
  .directive('validPasswordC', require('./validPasswordC'))
  .filter('urlFilter', require('./urlFilter'));

module.exports = moduleName;
