function listingCtrl($scope, $routeParams, service) {
  $scope.slug = $routeParams.slug;
  service.queryByType($scope.slug).then(function (response) {
    var result = response.data;
    $scope.entry = result;
  }).catch(function (err) {
    console.log(err);
  });
}

module.exports = ['$scope', '$routeParams', 'SponsoredListingService', listingCtrl];
