function service($http, endPoint, UserService) {
  return {
    add: function (formData) {
      // var token = UserService.getToken();
      // if (token) {
      //   return _add(token, formData);
      // } else {
      //
      // to do. for testing purpose only. will remove in production
      var email = 'best@test.com';
      var passwd = '12345678'
      return UserService.signIn(email, passwd).then(function (result) {
        var token = UserService.getToken();
        return _add(token, formData);
      }).catch(function (error) {
        console.log(error);
        throw error;
      });
      // }

      // the actual logic to post request
      function _add(token, formData) {
        var req = $http.post(endPoint + '/listing_user/treatment_centers', formData, {
          transformRequest: angular.identity,
          headers: {
            'Authorization': token,
            'Content-Type': undefined
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
      }
    }
  };
}

module.exports = ['$http', 'endPoint', 'UserService', service];
