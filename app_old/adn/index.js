var moduleName = 'app.adn';

angular.module(moduleName, ['ui.router', require('../services')])
  .component('adn', {
    template: require('./view.html'),
    controller: require('./ctrl'),
    controllerAs: '$ctrl'
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.ADN,
      url: '/adn',
      template: '<adn></adn>'
    });
}]);

module.exports = moduleName;
