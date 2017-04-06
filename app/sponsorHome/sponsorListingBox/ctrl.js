module.exports = ['$log', '$state', '$stateParams', '$window', 'TreatmentCenterService', ctrl];

function ctrl($log, $state, $stateParams, $window, service) {
  var vm = this;
  vm.$onInit = onInit;

  function onInit() {
    var keyword = '';
    if ($state.is('sponsorHome.filter')) {
      keyword = $stateParams.filterName;
    }
    if ($state.is('sponsorHome.state')) {
      keyword = $stateParams.stateName;
    }
    if ($state.is('sponsorHome.city')) {
      keyword = $stateParams.cityName;
    }
    if ($state.is('sponsorHome.county')) {
      keyword = $stateParams.countyName;
    }
    if (!keyword) {
      $state.go('home');
      return;
    }
    service.querySponsoredListings(keyword).then(function (result) {
      vm.entry = result;
      $window.scrollTo(0, 100);
    }).catch(function (err) {
      $log.error(err);
    });
  }
}
