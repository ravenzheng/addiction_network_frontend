module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'SignUpService', 'Status', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, service, Status) {
  var vm = this;

  var initStartupVars = function () {
    vm.userCreateFormInit = {};
    vm.userCreateFormInit.firstName = 1;
    vm.userCreateFormInit.lastName = 1;
    vm.userCreateFormInit.companyName = 1;
    vm.userCreateFormInit.phone = 1;
    vm.userCreateFormInit.email = 1;
    vm.userCreateFormInit.password = 1;
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
      $state.go(UIState.SIGN_UP.USER_PROFILE);
      $log.info(result);
    }).catch(function (err) {
      lm.$emit(Status.FAILED, err.data.error);
      vm.pwdRequiredTxt = err.data.user.password.errors[0];
      $log.info(err);
    });
  };
}
