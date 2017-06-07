module.exports = ['$log', '$http', 'endPoint', service];

function service($log, $http, endPoint) {
  return {
    sendMessage: sendMessage
  };

  function sendMessage(formdata) {
    return $http({
      url: endPoint + '/contact_us',
      method: 'POST',
      data: formdata,
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined
        // 'Authorization': token
      }
    });
  }
}
