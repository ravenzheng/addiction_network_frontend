function service($http, endPoint, UserService) {
    return {
        sponsorAdd: function(formData, auth) {
            var req = $http({
                url: endPoint + '/listing_user/sponsored_ads',
                method: "POST",
                data: formData,
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
            var email = 'best@test.com';
            var passwd = '12345678'
            return UserService.signIn(email, passwd).then(function(result) {
                var token = UserService.getToken();
                return token;
            }).catch(function(error) {
                throw error;
            });
        }

    };

}

module.exports = ['$http', 'endPoint', 'UserService', service];