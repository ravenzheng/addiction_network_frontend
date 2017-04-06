module.exports = ['$log', '$stateParams', '$window', 'TreatmentCenterService', ctrl];

function ctrl($log, $stateParams, $window, service) {
  var vm = this;
  vm.$onInit = onInit;

  function onInit() {
    // $log.info($stateParams);
    // vm.slug = $stateParams.slug;
    // service.querySponsoredListings(vm.slug).then(function (result) {
    //   vm.entry = result;
    //   $window.scrollTo(0, 100);
    // }).catch(function (err) {
    //   $log.error(err);
    // });
  }
}
