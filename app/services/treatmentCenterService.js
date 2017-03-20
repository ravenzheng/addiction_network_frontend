function service($http, endPoint, UserService) {
  return {
    queryDetail: queryDetail,
    queryList: queryList,
    add: add,
    edit: edit,
    activate: activate,
    remove: remove,
  };

  function queryDetail(id) {
    var req = $http.get(endPoint + '/treatment_center/' + id + '/detail')
    return _handle(req);
  }

  function queryList() {
    return UserService.getToken().then(function (result) {
      var token = result;
      var req = $http.get(endPoint + '/listing_user/treatment_centers', {
        headers: {
          'Authorization': token
        }
      });
      return _handle(req);
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
      return _handle(req);
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
      return _handle(req);
    });
  }

  function activate(id) {
    return UserService.getToken().then(function (token) {
      var req = $http.post(endPoint + '/listing_user/treatment_center/' + id + '/activate_deactivate', null, {
        headers: {
          'Authorization': token
        }
      });
      return _handle(req);
    });
  }

  function remove(id) {
    return UserService.getToken().then(function (token) {
      var req = $http.delete(endPoint + '/listing_user/treatment_centers/' + id, {
        headers: {
          'Authorization': token
        }
      });
      return _handle(req);
    });
  }

  function _handle(req) {
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

module.exports = ['$http', 'endPoint', 'UserService', service];
