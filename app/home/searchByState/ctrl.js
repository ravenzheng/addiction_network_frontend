module.exports = ['$state', ctrl];

function ctrl($state) {
  var vm = this;
  vm.onStateSelect = function (state) {
    $state.go('sponsorHome', {
      slug: state.shortname,
      state: true
    });
  };
}
