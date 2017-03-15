function service($http, endPoint) {
    return {
        addTreatmentCenter: function (scope, auth, formdata, file) {
            var data = {'user': scope.addtreatmentcenteruser, 'treatment_center': scope.addtreatmentcenter};
            var req = $http({
                url: endPoint + '/registrations',
                //dataType: "json",
                method: "POST",
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
