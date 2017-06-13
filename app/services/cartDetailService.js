module.exports = ['$log', '$http', 'endPoint', service];

function service($log, $http, endPoint) {
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
    return $http.get(endPoint + '/pricing');
  }
}
