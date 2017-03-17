function service($http, endPoint, UserService) {
    return {
        addTreatmentCenterSignUp: function ($scope, auth, formData) {
            var data_signup = {
                'email': $scope.addtreatmentcenteruser.email,
                'password': $scope.addtreatmentcenteruser.password,
                'password_confirmation': $scope.addtreatmentcenteruser.confirm_password,
                'first_name': $scope.addtreatmentcenteruser.first_name,
                'last_name': $scope.addtreatmentcenteruser.last_name,
                'company': $scope.addtreatmentcenteruser.company,
                'phone': $scope.addtreatmentcenteruser.phone,
            };
            for (var key in data_signup) {
                formData.append('user[' + key + ']', data_signup[key]);
            }
            if ($scope.addtreatmentcenter.center_name != "") {
                var data_treat = {
                    'center_name': $scope.addtreatmentcenter.center_name,
                    'description': $scope.addtreatmentcenter.description,
                    'center_web_link': $scope.addtreatmentcenter.center_web_link,
                    'listing_image': $scope.addtreatmentcenter.listing_image,
                    'heading_1': $scope.addtreatmentcenter.heading_1,
                    'heading_2': $scope.addtreatmentcenter.heading_2,
                    'heading_3': $scope.addtreatmentcenter.heading_3,
                    'heading_4': $scope.addtreatmentcenter.heading_4,
                    'content_1': $scope.addtreatmentcenter.content_1,
                    'content_2': $scope.addtreatmentcenter.content_2,
                    'content_3': $scope.addtreatmentcenter.content_3,
                    'content_4': $scope.addtreatmentcenter.content_4,
                    'address_line_1': $scope.addtreatmentcenter.address_line_1,
                    'address_line_2': $scope.addtreatmentcenter.address_line_2,
                    'city': $scope.addtreatmentcenter.city,
                    'pincode': $scope.addtreatmentcenter.pincode,
                    'state': $scope.addtreatmentcenter.state,
                    'phone': $scope.addtreatmentcenter.phone,
                    'email': $scope.addtreatmentcenter.email,
                    'featured': false,
                    'listing_type':'free'
                };
                for (var key in data_treat) {
                    formData.append('treatment_center[' + key + ']', data_treat[key]);
                }
            }
            if ($scope.addtreatmentcenter.image_data) {
                var image_data = $scope.addtreatmentcenter.image_data
                var len = image_data.length;
                for (var i = 0; i < len; i++) {
                    formData.append('treatment_center[image_data][]', image_data.item(i));
                }
            }
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
                var statusCode = res.status;
                return res.data;
            });
        },
        getAuthtoken: function () {
            var email = 'best@test.com';
            var passwd = '12345678'
            return UserService.signIn(email, passwd).then(function (result) {
                var token = UserService.getToken();
                return token;
            }).catch(function (error) {
                console.log(error);
                throw error;
            });
        }
    };
}

module.exports = ['$http', 'endPoint', 'UserService', service];