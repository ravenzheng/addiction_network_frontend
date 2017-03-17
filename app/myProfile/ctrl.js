function ctrl($scope, UserService) {
  var vm = this;
  var testEmail = 'best@test.com';
  var testPassword = '12345678';
  UserService.signIn(testEmail, testPassword).then(function () {
    return UserService.queryProfile().then(function (result) {
      $scope.profile = result.user;
    });
  }).catch(function (error) {
    // todo, display in message in the frontend page
    console.log(error.message);
  });
}

module.exports = ['$scope', 'UserService', ctrl];
