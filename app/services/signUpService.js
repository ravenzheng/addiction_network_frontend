module.exports = ['$log', '$http', 'endPoint', service];

function service($log, $http, endPoint) {
  return {
    signUp: signUp

  };
  // add new user
  function signUp(formdata) {
    return $http({
      url: endPoint + '/v2/signup_user_create',
      method: 'POST',
      data: formdata,
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined
      }
    });
  }
}
