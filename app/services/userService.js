module.exports = ['$http', '$q', 'endPoint', 'localStorageService', service];

function service($http, $q, endPoint, localStorageService) {
  var _service = this;
  _service.user = null;
  _service.signIn = signIn;
  _service.getToken = getToken;
  _service.queryProfile = queryProfile;
  _service.editProfile = editProfile;
  _service.changePassword = changePassword;

  // sign in with email and password
  function signIn(email, password) {
    return $http.post(endPoint + '/sessions', {
      'sessions': {
        email: email,
        password: password
      }
    }).then(function (result) {
      _service.user = result.user;
      localStorageService.set('token', result.user.auth_token);
      return result;
    });
  }

  // return token if user signed in.
  function getToken() {
    // for testing purpose, This has to be removed in production.
    var token = localStorageService.get('token');
    var deferred = $q.defer();
    if (token !== null) {
      deferred.resolve(token);
    } else {
      var email = 'best@test.com';
      var passwd = 'test12345';
      return _service.signIn(email, passwd).then(function (result) {
        localStorageService.set('token', result.user.auth_token);
        return result.user.auth_token;
      });
      // if token can not be acquired, redirect user to sign in page
    }
    return deferred.promise;
  }

  // query profile data with auth_token
  function queryProfile() {
    return _service.getToken().then(function (token) {
      return $http.get(endPoint + '/profile', {
        headers: {
          'Authorization': token
        }
      });
    });
  }

  // edit profile data
  function editProfile(formData) {
    return _service.getToken().then(function (token) {
      return $http.post(endPoint + '/profile', formData, {
        transformRequest: angular.identity,
        headers: {
          'Authorization': token,
          'Content-Type': undefined
        }
      });
    });
  }

  // change password
  function changePassword(formData) {
    return _service.getToken().then(function (token) {
      return $http.post(endPoint + '/password', formData, {
        headers: {
          'Authorization': token
        }
      });
    });
  }
}
