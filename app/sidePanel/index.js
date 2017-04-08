var moduleName = 'app.sidePanel';

require('./style.css');

angular.module(moduleName, [require('../components')])
  .component('findTreatmentSideCard', require('./findTreatmentSideCard'))
  .component('sideCard', require('./sideCard'))
  .component('viewCitiesCard', require('./viewCitiesCard'))
  .component('viewCountiesCard', require('./viewCountiesCard'))
  .component('sidePanel', {
    template: require('./view.html')
  });

module.exports = moduleName;
