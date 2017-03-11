function service($http, endPoint) {
  var errorMsg = 'Oops! An error occured, we are unable to retrieve data.';
  return {
    query: function () {
      var req = $http.get(endPoint + '/featured_listings');
      return req.then(function (res) {
        var status = res.status;
        if (status === 200) {
          return res.data;
        } else {
          console.log('status from request /featured_listings', status);
          throw new Error(errorMsg);
        }
      }).catch(function (error) {
        console.log(error.message);
        throw new Error(errorMsg);
      });
    }
  };
}

module.exports = ['$http', 'endPoint', service];
