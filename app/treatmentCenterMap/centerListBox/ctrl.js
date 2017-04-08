module.exports = ['$log', '$stateParams', 'TreatmentCenterService', ctrl];

function ctrl($log, $stateParams, service) {
  var vm = this;
  vm.$onInit = onInit;

  function onInit() {
    var data = $stateParams;
    service.search(data).then(function (result) {
      // get an empty listings
      if (!result.listings.length) {
        throw new Error('Got an empty dataset at centerListBox.');
      }
      var listings = result.listings.map(function (listing) {
        listing.uiSref = 'treatmentCenterDetail({id: "' + listing.id + '"})';
        return listing;
      });
      vm.listings = listings;
      vm.displayError = false;
    }).catch(function (err) {
      $log.error(err);
      vm.displayError = true;
    });
  }
}
