module.exports = ['$log', '$http', 'endPoint', service];

function service($log, $http, endPoint) {
  return {
    signUp: signUp,
    addCenter: addCenter,
    getCategories: getCategories,
    getTagsSelection: getTagsSelection,
    addOptionalFields: addOptionalFields
  };
  // add new user
  function signUp(formdata) {
    return $http({
      url: endPoint + '/v2/signup_user_create',
      method: 'POST',
      data: formdata,
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined
      }
    });
  }
  // add center
  function addCenter(formdata, token) {
    return $http({
      url: endPoint + '/v2/treatment_center_create_center',
      method: 'POST',
      data: formdata,
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        'Authorization': token
      }
    });
  }
  // get categories
  function getCategories(token) {
    return $http({
      url: endPoint + '/v2/category_select',
      method: 'GET',
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        'Authorization': token
      }
    });
  }
  // get tag selection
  function getTagsSelection(token) {
    return $http({
      url: endPoint + '/v2/tag_select',
      method: 'GET',
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        'Authorization': token
      }
    });
  }
  // optional fields
  function addOptionalFields(formdata, centerId, token) {
    return $http({
      url: endPoint + '/v2/treatment_center_create_optional/' + centerId,
      method: 'POST',
      data: formdata,
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        'Authorization': token
      }
    });
  }
}
