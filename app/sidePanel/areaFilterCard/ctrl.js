module.exports = ['$log', '$scope', '$state', '$stateParams', ctrl];

function ctrl($log, $scope, $state, $stateParams) {
  var vm = this;
  vm.$onInit = onInit;
  vm.goToState = goToState;
  vm.goToCities = goToCities;
  vm.goToCounties = goToCounties;

  var uiStatesToDiplsay = [
    'sponsorHome.state',
    'sponsorHome.county',
    'sponsorHome.city',
    'sponsorHome.counties',
    'sponsorHome.citiesOfState',
    'sponsorHome.citiesOfCounty'
  ];

  $scope.$on('$stateChangeStart', function (event, toState, toParams) {
    if (uiStatesToDiplsay.indexOf(toState.name) === -1) {
      vm.display = false;
      return;
    }
    vm.display = true;
    vm.stateName = toParams.stateName;
    vm.countyName = toParams.countyName;
    vm.stateLinkClass = (toState.name === 'sponsorHome.state') ? 'area-filter-link-disabled' : 'area-filter-link-normal';
  });

  function onInit() {
    if (uiStatesToDiplsay.indexOf($state.current.name) === -1) {
      vm.display = false;
      return;
    }
    vm.display = true;
    vm.stateName = $stateParams.stateName;
    vm.countyName = $stateParams.countyName;
    vm.stateLinkClass = ($state.current.name === 'sponsorHome.state') ? 'area-filter-link-disabled' : 'area-filter-link-normal';
  }

  function goToState() {
    // already at the state sponsor listing page
    if ($state.is('sponsorHome.state')) {
      return;
    }
    // go to state sponsor listing page
    $state.go('sponsorHome.state', {
      stateName: vm.stateName
    });
  }

  // click to view All Cities of a county
  function goToCities() {
    if ($stateParams.countyName && $stateParams.stateName) {
      $state.go('sponsorHome.citiesOfCounty', {
        stateName: vm.stateName,
        countyName: vm.countyName
      });
      return;
    }
    if ($stateParams.stateName) {
      $state.go('sponsorHome.citiesOfState', {
        stateName: vm.stateName
      });
    }

    // if ($state.is('sponsorHome.state') || $state.is('sponsorHome.counties')) {
    //   $state.go('sponsorHome.citiesOfState', {
    //     stateName: vm.stateName
    //   });
    //   return;
    // }
    // if ($state.is('sponsorHome.county')) {
    //   $state.go('sponsorHome.citiesOfCounty', {
    //     stateName: vm.stateName,
    //     countyName: vm.countyName
    //   });
    // }
  }

  function goToCounties() {
    $state.go('sponsorHome.counties', {
      stateName: vm.stateName
    });
  }
}
