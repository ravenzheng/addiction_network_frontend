module.exports = ['$log', '$http', 'endPoint', service];

function service($log, $http, endPoint) {
  return {
    signUp: signUp,
    addCenter: addCenter,
    getCategories: getCategories,
    getTagsSelection: getTagsSelection,
    addOptionalFields: addOptionalFields,
    upgradeMembership: upgradeMembership,
    publishAds: publishAds,
    getPublishAds: getPublishAds,
    getCartDetails: getCartDetails
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

  // Upgrade membership
  function upgradeMembership(formdata, token) {
    return $http({
      url: endPoint + '/upgrade_membership',
      method: 'POST',
      data: formdata,
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        'Authorization': token
      }
    });
  }

  // publish ads
  function publishAds(formdata, token) {
    return $http({
      url: endPoint + '/v2/treatment_center_publish_ads',
      method: 'POST',
      data: formdata,
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        'Authorization': token
      }
    });
  }

  // get published ads details
  function getPublishAds(centerId, token) {
    return $http({
      url: endPoint + '/v2/treatment_center_publish_ads_details/' + centerId,
      method: 'GET',
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        'Authorization': token
      }
    });
  }
  // Get cart details
  function getCartDetails(token) {
    return $http({
      url: endPoint + '/v2/cart/',
      method: 'GET',
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        'Authorization': token
      }
    });
  }
}
