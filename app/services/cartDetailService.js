module.exports = ['$log', '$http', 'endPoint', 'localStorageService', service];

function service($log, $http, endPoint, localStorageService) {
  return {
    getCartInfo: getCartInfo,
    getPriceInfo: getSignupPriceInfo
  };

  // getCartInfo
  function getCartInfo(countyIdApi, cityIdsApi) {
    return $http.get(endPoint + '/get_counties_cities_by_ids?counties_ids=' + countyIdApi + '&cities_ids=' + cityIdsApi);
  }

  // get price info for state, city, county, sponsored

  function getSignupPriceInfo() {
    var userToken = localStorageService.get('signupToken');
    if (!userToken) {
      userToken = localStorageService.get('token');
    }
    return $http({
      url: endPoint + '/pricing',
      method: 'GET',
      headers: {
        'Authorization': userToken,
        'Content-Type': undefined
      }
    });
  }
}
