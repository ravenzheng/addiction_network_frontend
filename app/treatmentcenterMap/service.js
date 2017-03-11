function service($http, endPoint) {
    return {
        queryBySearch: function (final_data) {
            return $http.post(endPoint + '/search_treatment_centers', final_data);
        }
    };
}

module.exports = ['$http', 'endPoint', service];
