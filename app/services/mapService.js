module.exports = ['$http', 'endPoint', 'mapConfig', service];

function service($http, endPoint, mapConfig) {
  return {
    getStates: getStates,
    getCitiesByState: getCitiesByState
  };

  function getStates() {
    return $http.get(endPoint + '/states');
  }

  function getCitiesByState(state) {
    var fullname = '';
    if (state.length === 2) {
      // shortname, find the fullname for that state
      var stateObj = mapConfig.states.find(compare(state));
      fullname = stateObj.fullname;
    }
    fullname = fullname[0].toUpperCase() + fullname.slice(1).toLowerCase();
    return $http.get(endPoint + '/cities_states/' + fullname);
    // return $http.get(endPoint + '/cities_states/' + _state);
  }

  function compare(source) {
    return function (target) {
      return source === target.shortname;
    };
  }
}
