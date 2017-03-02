function service($http, endPoint) {
  return {
    queryBySlug: function (slug) {
      return $http.post(endPoint + '/treatment_center_detail', {
        'slug': slug
      });
    }
  };
}

module.exports = ['$http', 'endPoint', service];
