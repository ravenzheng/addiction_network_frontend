function ctrl($scope, $routeParams, service) {
    $scope.required = true;
    $scope.type = $routeParams.type;
    var id = $routeParams.id;

    var auth = '';

    service.getAuthtoken($scope).then(function (response) {
        console.log('response: ' + response.user.auth_token);

        auth = response.user.auth_token;
        user_id = response.user.id;
        //var result = response.data;
        //$scope.featured_listing = response.data;
    }).catch(function (err) {
        console.log('error: ' + err);
    });
    //auth='fsf';
    //$scope.auth=auth;



    var formdata = new FormData();
    var file;
    $scope.getTheFiles = function ($files) {
        console.log($files[0]);
        file = $files[0];
        angular.forEach($files, function (value, key) {
            console.log(key + ' :' + value);
            formdata.append(key, value);
        });

    };
    console.log(formdata[0]);   // file data save here


    $scope.success_msg = 0;
    $scope.submitForm = function () {
        //$scope.addlist.listing_image = [];
        //$scope.addlist.listing_image = file;
        //console.log('test'+$scope.addlist.listing_image);	 	

        //return;
        service.addListing($scope, auth, formdata, file).then(function (response) {

            console.log('response2: ' + response);
            //var result = response.data;
            //$scope.featured_listing = response.data;
            $scope.success_msg = 1;
        }).catch(function (err) {
            console.log('error: ' + err);
        });

    }

}

module.exports = ['$scope', '$routeParams', 'AddlistService', ctrl];
