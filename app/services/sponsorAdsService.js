function service($http, endPoint, UserService) {
    return {
        sponsorList: sponsorList,
        sponsorAdStatus: sponsorAdStatus,
        editSponsor: editSponsor,
        sponsorAdd: sponsorAdd,
        updateStatus: updateStatus,
        getSponsoredSelect:getSponsoredSelect
    };
    function sponsorList() {
        return UserService.getToken().then(function (result) {
            var token = result;
            var req = $http({
                url: endPoint + '/listing_user/sponsored_ads/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            return _handle(req);
        });
    }

    function sponsorAdStatus(id) {
        return UserService.getToken().then(function (result) {
            var token = result;
            var req = $http({
                url: endPoint + '/listing_user/sponsored_ad/' + id + '/activate_deactivate',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });

            return _handle(req);
        });
    }

    function sponsorAdd(formData) {

        return UserService.getToken().then(function (result) {
            var token = result;
            var req = $http({
                url: endPoint + '/listing_user/sponsored_ads',
                method: "POST",
                data: formData,
                transformRequest: angular.identity,
                headers: {
                    'Authorization': token,
                    'Content-Type': undefined
                }
            });

            return _handle(req);
        });
    }

    function editSponsor(formdata, id) {
        return UserService.getToken().then(function (result) {
            var token = result;
            var req = $http({
                url: endPoint + '/listing_user/sponsored_ads/' + id,
                method: "PATCH",
                data: formdata,
                transformRequest: angular.identity,
                headers: {
                    'Authorization': token,
                    'Content-Type': undefined
                }
            });
            return _handle(req);
        });

    }
    function getSponsoredSelect() {

        return UserService.getToken().then(function (result) {
            var token = result;
            var req = $http({
                url: endPoint + '/listing_user/sponsored_ad_select/',
                method: "GET",
                transformRequest: angular.identity,
                headers: {
                    'Authorization': token,
                    'Content-Type': undefined
                }
            });
            return _handle(req);
        });

    }
    function updateStatus(id) {
        return UserService.getToken().then(function (result) {
            var token = result;
            var req = $http({
                url: endPoint + '/listing_user/sponsored_ad/' + id + '/activate_deactivate',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            return _handle(req);
        });
    }
    function _handle(req) {
        return req.then(function (res) {
            var status = res.status;
            if (status === 200) {
                return res.data;
            } else {
                throw new Error(res.statusText);
            }
        });
    }

}

module.exports = ['$http', 'endPoint', 'UserService', service];
