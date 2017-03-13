function ctrl($scope, service) {
  service.query().then(function (result) {
    var listings = result.listings.map(function (listing) {
      listing.link = '#/treatment_center/' + listing.id + '/detail';
      return listing;
    });
    $scope.listings = listings;
  }).catch(function (err) {
    // todo, display the error message in the page.
    console.log(err);
  });
}

module.exports = ['$scope', 'HomeListingService', ctrl];
