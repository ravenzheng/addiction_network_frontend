function listingCtrl($scope, $routeParams, service) {
    var result = require('./home.json');
    $scope.type = $routeParams.type;
    var listings = result.listings.map(function (listing) {
        var content_paragraph = listing.content_paragraph;
        var listing_href = content_paragraph.toLowerCase().replace(/ /g, '_');
        listing.id = 1;
        listing.listing_href = '#/treatment_center/' + listing.id + '/detail';
        return listing;
    });
    result.listings = listings;
    $scope.entry = result;
    $scope.slug = $routeParams.slug;
    service.queryByType($scope.slug).then(function (response) {
        var result = response.data;
        $scope.featured_listing = response.data;
    }).catch(function (err) {
        console.log(err);
    });
}

module.exports = ['$scope', '$routeParams', 'HomeListingService', listingCtrl];
