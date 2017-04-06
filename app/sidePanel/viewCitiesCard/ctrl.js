module.exports = ['$anchorScroll', '$location', '$log', '$state', ctrl];

function ctrl($anchorScroll, $location, $log, $state) {
  var vm = this;
  vm.$onInit = onInit;
  vm.scrollToCities = scrollToCities;

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
  }

  // click View All Cities
  function scrollToCities() {
    $location.hash('cities');
    $anchorScroll();
  }
}
