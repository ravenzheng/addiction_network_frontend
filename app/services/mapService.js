module.exports = ['$http', 'endPoint', service];

function service($http, endPoint) {
  return {
    getStates: getStates,
    getCitiesByState: getCitiesByState
  };

  function getStates() {
    return $http.get(endPoint + '/states');
  }

  function getCitiesByState(state) {
    return $http.get(endPoint + '/cities/' + state);
  }
}
