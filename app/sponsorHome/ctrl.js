function ctrl($stateParams, service) {
  var vm = this;
  vm.slug = $stateParams.slug;
  service.queryByType(vm.slug).then(function (response) {
    vm.entry = response.data;
  }).catch(function (err) {
    console.log(err);
  });
}

module.exports = ['$stateParams', 'SponsoredListingService', ctrl];
