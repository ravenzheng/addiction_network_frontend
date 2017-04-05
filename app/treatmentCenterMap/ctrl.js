module.exports = ['$log', '$scope', '$location', '$stateParams', '$state', ctrl];

function ctrl($log, $scope, $location, $stateParams, $state) {
  var vm = this;
  vm.onFormStateSelect = onFormStateSelect;
  vm.onMapStateSelect = onMapStateSelect;
  vm.submit = submit;

  // listen the onUpdate event of state-select
  function onFormStateSelect(selected) {
    vm.state = selected;
  }

  // listen the onSelect event of map-box component
  function onMapStateSelect(state) {
    $state.go('treatmentCenterMap.list', {
      state: state.fullname
    });
  }

  // submit search form
  function submit() {
    var categories = [];
    if (vm.catg1) {
      categories.push(1);
    }
    if (vm.catg2) {
      categories.push(2);
    }
    if (vm.catg3) {
      categories.push(3);
    }
    if (vm.catg4) {
      categories.push(4);
    }
    var params = {
      categories: categories.join(','),
      state: vm.state,
      zipcode: vm.zipcode,
      miles: vm.miles
    };
    $state.go('treatmentCenterMap.list', params);
  }
}
