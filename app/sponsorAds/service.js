function service($http, endPoint,UserService) {
    return {
        sponsorList: function(auth) {
            var req = $http({
                url: endPoint + '/listing_user/sponsored_ads/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': auth
                }
            });
            return req.then(function(res) {
                var data = res.data;
                return data;
            });
        },
        sponsorAdStatus: function(id, auth) {
            var req = $http({
                url: endPoint + '/listing_user/sponsored_ad/' + id + '/activate_deactivate',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': auth
                }
            });

            return req.then(function(res) {
                var data = res.data;
                return data;
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

module.exports = ['$http', 'endPoint', 'UserService',service];