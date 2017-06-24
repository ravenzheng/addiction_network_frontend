var moduleName = 'app.sidePanel';

require('./style.css');

angular.module(moduleName, [require('../components')])
  .component('areaFilterCard', require('./areaFilterCard'))
  .component('findTreatmentSideCard', require('./findTreatmentSideCard'))
  .component('sideCard', require('./sideCard'))
  .filter('capitalize', function () {
    return function (input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
  })
  .component('sidePanel', {
    template: require('./view.html')
  });

module.exports = moduleName;
