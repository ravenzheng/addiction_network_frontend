module.exports = ['FeaturedService', '$rootScope', 'UIState', '$state', 'Status', ctrl];

function ctrl(FeaturedService, $rootScope, UIState, $state, Status) {
  var vm = this;
  vm.subscribeFeatured = function () {
    FeaturedService.subscribeFeatured().then(function () {
      $rootScope.$emit(Status.SUCCEEDED, 'Successfully subscribed to featured Listing.');
      $rootScope.doneSteps = $rootScope.doneSteps.concat(['FeaturedListing']);
      $rootScope.addListingStepDone = 9;
      $state.go(UIState.MY_PROFILE.PROFILE);
    });
  };

  vm.cancelState = UIState.MY_PROFILE.PROFILE;
  vm.backState = UIState.ADD_LISTING.FEATURED_LISTING_PAGE5;
}