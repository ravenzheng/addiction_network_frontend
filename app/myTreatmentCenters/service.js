function service($http, endPoint, UserService) {
  return {
    query: function () {
      return UserService.getToken().then(function (result) {
        var token = result;
        var req = $http.get(endPoint + '/listing_user/treatment_centers', {
          headers: {
            'Authorization': token
          }
        });
        return req.then(function (res) {
          var status = res.status;
          if (status === 200) {
            return res.data;
          } else {
            throw new Error(res.statusText);
          }
        });
      });
    }
  }
}

module.exports = ['$http', 'endPoint', 'UserService', service];
