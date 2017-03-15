// URL: /sessions
// Response:
// {
//   "user": {
//     "auth_token": "3VYpnRfysejzPs5_wRHD",
//     "id": 6,
//     "email": "best@test.com",
//     "created_date": "03/10/2017",
//     "last_updated_date": "03/14/2017",
//     "password_reset_token": null,
//     "password_reset_sent_at": null
//   }
// }


function service($http, endPoint) {
  return {
    signIn: function (email, password) {
      var req = $http.post(endPoint + '/sessions', {
        'sessions': {
          email: email,
          password: password
        }
      });
      return res(req).then(function (result) {
        var user = result.user;
        $http.defaults.headers.common.Authorization = user.auth_token;
        return result;
      });
    },
    queryProfile: function () {
      var req = $http.get(endPoint + '/profile');
      return res(req);
    }
  };
}

var errorMsg = 'Oops! An error occured, we are unable to retrieve data.';

function res(req) {
  return req.then(function (res) {
    var status = res.status;
    if (status === 200) {
      return res.data;
    } else {
      console.log('status:', status);
      throw new Error(errorMsg);
    }
  }).catch(function (error) {
    console.log(error.message);
    throw new Error(errorMsg);
  });
}

module.exports = ['$http', 'endPoint', service];
