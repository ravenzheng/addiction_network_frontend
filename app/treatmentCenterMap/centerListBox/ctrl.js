module.exports = ['$log', '$stateParams', 'UIState', 'TreatmentCenterService', ctrl];

function ctrl($log, $stateParams, UIState, service) {
  var vm = this;
  vm.$onInit = onInit;

  function onInit() {
    var data = $stateParams;
    service.search(data).then(function (result) {
      var listings = result.listings;
      // get an empty listings
      if (!listings.length) {
        throw new Error('Got an empty dataset at centerListBox.');
      }
      vm.listings = listings.map(function (listing) {
        listing.uiSref = UIState.CENTER_DETAIL + '({id:"' + listing.id + '"})';
        return listing;
      });
      vm.displayError = false;
    }).catch(function (err) {
      $log.error(err);
      vm.displayError = true;
    });
  }
}
