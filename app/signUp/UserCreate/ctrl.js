module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'SignUpService', 'Status', 'localStorageService', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, service, Status, localStorageService) {
  var vm = this;

  var initStartupVars = function () {
    vm.userCreateFormInit = {};
    vm.userCreateFormInit.firstName = 1;
    vm.userCreateFormInit.lastName = 1;
    vm.userCreateFormInit.companyName = 1;
    vm.userCreateFormInit.phone = 1;
    vm.userCreateFormInit.email = 1;
    vm.userCreateFormInit.password = 1;
    vm.emailErrorTxt = '';
    vm.pwdRequiredTxt = 'Required';
  };

  initStartupVars();

  vm.userCreate = function () {
    var lm = $rootScope; // this;
    var formData = new FormData();
    var sigupData = {
      'first_name': vm.first_name,
      'last_name': vm.last_name,
      'company': vm.company_name,
      'phone': vm.phone_num,
      'email': vm.email,
      'password': vm.password,
      'username': vm.phone_num + vm.first_name
    };

    for (var key in sigupData) {
      formData.append('user[' + key + ']', sigupData[key]);
    }

    $log.info(formData);
    service.signUp(formData).then(function (result) {
      localStorageService.set('signupToken', result.user.auth_token);
      $state.go(UIState.SIGN_UP.USER_PROFILE);
      $log.info(result);
    }).catch(function (err) {
      lm.$emit(Status.FAILED, err.data.error);
      if (angular.isDefined(err.data.user.password)) {
        vm.pwdRequiredTxt = err.data.user.password.errors[0];
      } else {
        vm.pwdRequiredTxt = 'Required';
      }
      if (angular.isDefined(err.data.user.email)) {
        vm.emailErrorTxt = err.data.user.email.errors[0];
      } else {
        vm.emailErrorTxt = '';
      }

      $log.info(err);
    });
  };
}
