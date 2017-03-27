function service($http, endPoint, UserService) {
  return {
    addTreatmentCenterSignUp: function (auth, formData) {
      var req = $http({
        url: endPoint + '/registrations',
        method: "POST",
        data: formData,
        transformRequest: angular.identity,
        headers: {
          'Authorization': auth,
          'Content-Type': undefined
        }
      });
      return req.then(function (res) {
        return res.data;
      });
    },
    getStates: function () {
      var req = $http({
        url: endPoint + '/states',
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return req.then(function (res) {
        return res.data;
      });
    },
    getCities: function (state) {
      var req = $http({
        url: endPoint + '/cities_states/' + state,
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return req.then(function (res) {
        return res.data;
      });
    },
    getAuthtoken: function () {
      return UserService.getToken().then(function (result) {
        var token = result;
        return token;
      }).catch(function (error) {
        throw error;
      });
    }
  };
}
module.exports = ['$http', 'endPoint', 'UserService', service];
