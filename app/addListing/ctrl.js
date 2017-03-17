function ctrl($scope, $routeParams, service) {
    $scope.required = true;
    $scope.type = $routeParams.type;
    var id = $routeParams.id;
    var auth = '';
    service.getAuthtoken($scope).then(function (response) {
        auth = response;
    }).catch(function (err) {
        console.log('error: ' + err);
    });
    var formData = new FormData();
    $scope.success_msg = 0;
    $scope.submitForm = function () {
        service.addTreatmentCenterSignUp($scope, auth, formData).then(function (response) {
            $scope.success_msg = 1;
        }).catch(function (err) {
            $("#email_err").html(err.data.user.email.errors);
            $("#pass_err").html(err.data.user.password.errors);
        });
    }
}
module.exports = ['$scope', '$routeParams', 'addTreatmentCenterSignUpService', ctrl];