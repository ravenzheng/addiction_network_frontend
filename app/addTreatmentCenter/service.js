function service($http, endPoint) {
    return {
        addListing: function (scope, auth, formdata, file) {
            var data = {'treatment_center': scope.addlist};
            var req = $http({
                url: endPoint + '/listing_user/treatment_centers',
                //dataType: "json",
                method: "POST",
                //data: $.param({treatment_center:{'center_name': scope.addlist.center_name,''}}),
                //data:{"treatment_center":{"center_name":scope.addlist.center_name,"description":scope.addlist.description,"center_web_link":scope.addlist.center_web_link,"address_line_1":scope.addlist.address_line_1,"city":scope.addlist.city,"pincode":scope.addlist.pincode,"state":scope.addlist.state,"country":scope.addlist.country,"phone":scope.addlist.phone,"email":scope.addlist.email} },
                data: data,
                //data:formdata,
                headers: {'Content-Type': 'application/json', 'Authorization': auth}
            });

            return req.then(function (res) {
                var statusCode = res.status;
                //console.log('fdsf'+res);
                return res.data;
            });
        },
        getAuthtoken: function () {

            var req = $http({
                url: endPoint + '/sessions',
                //dataType: "json",
                method: "POST",
                data: $.param({'sessions[email]': "best@test.com", 'sessions[password]': '12345678'}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });

            return req.then(function (res) {
                var statusCode = res.status;
                //console.log('fdsf'+res);
                return res.data;
            });

        }

    };

    function getauth() {

        var req = $http({
            async: false,
            url: endPoint + '/sessions',
            //dataType: "json",
            method: "POST",
            data: $.param({'sessions[email]': "best@test.com", 'sessions[password]': '12345678'}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

        req.then(function (res) {
            var statusCode = res.status;
            //console.log('fdsf'+res);
            return res.data;
        });

    }

}

module.exports = ['$http', 'endPoint', service];
