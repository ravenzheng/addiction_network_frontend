function listingService($http, endPoint) {
  return {
    queryByType: function (type) {
      return $http.get(endPoint + '/featured_listings', {
        
      });
    }
  };
}

module.exports = ['$http', 'endPoint', listingService];
