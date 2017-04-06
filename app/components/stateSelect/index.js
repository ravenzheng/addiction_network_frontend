function ctrl($http, endPoint, service) {
  var vm = this;
  vm.$onInit = onInit;

  function onInit() {
    service.getStates().then(function (states) {
      vm.stats = states;
    });
  }
}
ctrl.$inject = ['$http', 'endPoint', 'MapService'];

module.exports = {
  template: require('./view.html'),
  controller: ctrl,
  bindings: {
    selected: '@',
    onUpdate: '&'
  }
};
