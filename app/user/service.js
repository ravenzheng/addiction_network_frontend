function service($http, endPoint) {
  var _service = this;
  _service.user = null;
  _service.signIn = signIn;
  _service.getToken = getToken;
  _service.queryProfile = queryProfile;

  // sign in with email and password
  function signIn(email, password) {
    var req = $http.post(endPoint + '/sessions', {
      'sessions': {
        email: email,
        password: password
      }
    });
    return _handle(req).then(function (result) {
      _service.user = result.user;
      return result;
    });
  }

  // return token if user signed in.
  function getToken() {
    return _service.user ? _service.user.auth_token : null;
  }

  // query profile data with auth_token
  function queryProfile() {
    return _service.getToken().then(function (result) {
      var req = $http.get(endPoint + '/profile', {
        headers: {
          Authorization: auth_token
        }
      });
      return _handle(req);
    });
  }

  // handle rejection of promise
  function _handle(req) {
    var errorMsg = 'Oops! An error occured, we are unable to retrieve data.';
    return req.then(function (res) {
      var status = res.status;
      if (status === 200) {
        return res.data;
      } else {
        throw new Error(res.statusText);
      }
    }).catch(function (error) {
      console.log(error.message);
      throw new Error(errorMsg);
    });
  }
}

module.exports = ['$http', 'endPoint', service];
