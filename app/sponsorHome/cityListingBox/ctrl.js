module.exports = ['$log', '$state', 'MapService', ctrl];

function ctrl($log, $state, service) {
  var vm = this;
  vm.$onInit = onInit;

  function onInit() {
    if (!$state.is('sponsorHome')) {
      vm.display = false;
      return;
    }
    if (!$state.params || $state.params.state !== 'true') {
      vm.display = false;
      return;
    }
    vm.display = true;
    vm.state = $state.params.slug;
    service.getCitiesByState(vm.state).then(function (result) {
      vm.cities = result;
      $log.info(result);
    }).catch(function (err) {
      $log.error(err);
    });
  }
}
