module.exports = ['$log', '$http', 'endPoint', service];

function service($log, $http, endPoint) {
  return {
    getCartInfo: getCartInfo
  };

  // getCartInfo
  function getCartInfo(countyIdApi, cityIdsApi) {
    return $http.get(endPoint + '/get_counties_cities_by_ids?counties_ids=' + countyIdApi + '&cities_ids=' + cityIdsApi);
  }
}
