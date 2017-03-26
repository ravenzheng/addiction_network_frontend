function service($http, endPoint, UserService) {
  return {
    getStatelist: getStates,
    getCitylist: getCities,
    getSponsorIds: getSponsorIds
    
  };  
  function getStates() {
        
        return UserService.getToken().then(function (result) {
            var token=result;
            
            var req = $http({
                url: endPoint + '/states',
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
    function getCities(state) {

        return UserService.getToken().then(function (result) {
            var token = result;

            var req = $http({
                url: endPoint + '/cities_states/'+state,
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
    function getSponsorIds() {

        return UserService.getToken().then(function (result) {
            var token = result;

            var req = $http({
                url: endPoint + '/listing_user/sponsored_ad_select',
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
