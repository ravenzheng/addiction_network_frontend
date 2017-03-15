function service($http, endPoint) {
  var errorMsg = 'Oops! An error occured, we are unable to retrieve data.';
  return {
    add: function (authrization, formData) {
      var req = $http.post(endPoint + '/listing_user/treatment_centers', formData, {
        transformRequest: angular.identity,
        headers: {
          'Authrization': authrization,
          'Content-Type': undefined
        }
      });
      return req.then(function (res) {
        var status = res.status;
        if (status === 200) {
          return res.data;
        } else {
          console.log('status from request /todo', status);
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
