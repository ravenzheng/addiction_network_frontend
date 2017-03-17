function service($http, endPoint) {
    return {
        sponsorEdit: function(formdata, auth, id) {
            var req = $http({
                url: endPoint + '/listing_user/sponsored_ads/' + id,
                method: "PATCH",
                data: formdata,
                transformRequest: angular.identity,
                headers: {
                    'Authorization': auth,
                    'Content-Type': undefined
                }
            });

            return req.then(function(res) {
                var statusCode = res.status;
                return statusCode;
            });
        },
        getAuthtoken: function() {
            var req = $http({
                url: endPoint + '/sessions',
                method: "POST",
                data: $.param({
                    'sessions[email]': "best@test.com",
                    'sessions[password]': '12345678'
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            return req.then(function(res) {
                var statusCode = res.status;
                return statusCode;
            });
        }
    };
}

module.exports = ['$http', 'endPoint', service];