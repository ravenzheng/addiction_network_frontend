module.exports = {
  template: '<city-list-box area="$ctrl.area" cities="$ctrl.cities" displayError="$ctrl.displayError" go-to-city="$ctrl.goToCity(cityName)"></city-list-box>',
  controller: require('./ctrl')
};
