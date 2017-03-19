function service($http, endPoint, UserService) {
  return {
    queryDetail: queryDetail,
    add: add,
    edit: edit,
    activate: activate
  };

  function queryDetail(id) {
    var req = $http.get(endPoint + '/treatment_center/' + id + '/detail')
    return req.then(function (res) {
      var status = res.status;
      if (status === 200) {
        return res.data;
      } else {
        throw new Error(res.statusText);
      }
    });
  }

  function add(formData) {
    return UserService.getToken().then(function (token) {
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
    });
  }

  function edit(id, formData) {
    return UserService.getToken().then(function (token) {
      var req = $http.patch(endPoint + '/listing_user/treatment_centers/' + id, formData, {
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
    });
  }

  function activate(id) {
    return UserService.getToken().then(function (token) {
      var req = $http.post(endPoint + '/listing_user/treatment_center/' + id + '/activate_deactivate', {
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

module.exports = ['$http', 'endPoint', 'UserService', service];
