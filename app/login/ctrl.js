function ctrl($log, UserService, $rootScope, $window, $document, localStorageService, Status) {
  var vm = this;
  var getUserInfo = (localStorageService.get('userInfo', 'sessionStorage') !== null) ? localStorageService.get('userInfo', 'sessionStorage') : localStorageService.get('userLoginInfo', 'sessionStorage');

  if (getUserInfo !== null) {
    //  alert(getUserInfo.email);
    $rootScope.$emit(Status.SUCCEEDED, 'Please wait while we login you automatically');
    var email = getUserInfo.email;
    var password = getUserInfo.password;
    UserService.signIn(email, password).then(function () {
      $rootScope.login = 1;
      $rootScope.$emit(Status.SUCCEEDED, 'You are logged in');
      $window.location.href = '/#my-profile/profile';
    }).catch(function (errors) {
      // todo, display the error message in the page.
      // var error = angular.element($document[0].querySelector('#error_if'));
      // error.html('Invalid email or password');
      $rootScope.$emit(Status.FAILED, 'Invalid email or password');
      $log.error(errors);
    });
  }

  vm.submit = function () {
    email = vm.email;
    password = vm.password;
    UserService.signIn(email, password).then(function () {
      $rootScope.login = 1;
      $window.location.href = '/#my-profile/profile';
      $rootScope.$emit(Status.SUCCEEDED, 'You are logged in');
    }).catch(function (errors) {
      // todo, display the error message in the page.
      $rootScope.$emit(Status.FAILED, 'Invalid email or password');
      // var error = angular.element($document[0].querySelector('#error_if'));
      // error.html('Invalid email or password');
      $log.error(errors);
    });
    return false;
  };
}

module.exports = ['$log', 'UserService', '$rootScope', '$window', '$document', 'localStorageService', 'Status', ctrl];
