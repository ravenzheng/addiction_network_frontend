module.exports = {
  template: '<city-list-box area="$ctrl.area" cities="$ctrl.cities" go-to-city="$ctrl.goToCity(cityName)"></city-list-box>',
  controller: require('./ctrl')
};
