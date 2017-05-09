function ctrl($log, $rootScope, Status, $window, localStorageService, $state, UIState, CartDetailService) {
  $rootScope.getCartDetails = function (countyIds, cityIds) {
    var cityIdsApi = [];
    var countyIdApi = [];
    var id = '';
    var i = 0;
    i = 0;
    for (var key in countyIds) {
      id = String(countyIds[key].id);
      countyIdApi[i] = id;
      i++;
    }
    for (key in cityIds) {
      id = String(cityIds[key].id);
      cityIdsApi[i] = id;
      i++;
    }
    CartDetailService.getCartInfo(countyIdApi, cityIdsApi).then(function (result) {
      var totalCounty = 0;
      for (var j = 0; j < result.counties.length; j++) {
        var totalCounties = result.counties[j].price;
        totalCounty += totalCounties;
      }
      var totalCity = 0;
      for (var k = 0; k < result.cities.length; k++) {
        var totalCities = result.cities[k].price;
        totalCity += totalCities;
      }
      $log.info('cities' + totalCounty);
      $log.info('counties' + totalCity);
      var total = totalCounty + totalCity;
      $rootScope.counties = result.counties;
      $rootScope.cities = result.cities;
      $rootScope.total = total;
    }).catch(function (err) {
      $log.error(err);
    });
  };
}
module.exports = ['$log', '$rootScope', 'Status', '$window', 'localStorageService', '$state', 'UIState', 'CartDetailService', ctrl];
