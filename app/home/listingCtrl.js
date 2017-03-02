var result = require('./home.json');

function listingCtrl($scope, $routeParams, ListingService) {
  $scope.type = $routeParams.type;
  var listings = result.listings.map(function (listing) {
    var content_paragraph = listing.content_paragraph;
    var listing_href = content_paragraph.toLowerCase().replace(/ /g, '_');
    listing.listing_href = '#/treatment_center_detail/?slug=' + listing_href;
    return listing;
  });
  result.listings = listings;
  $scope.entry = result;
  // ListingService.queryByType($scope.type).then(function (response) {
  //   var result = response.data;
  //   $scope.entry = result;
  // }).catch(function (err) {
  //   console.log(err);
  // });
}

module.exports = ['$scope', '$routeParams', 'SponsoredListingService', listingCtrl];
