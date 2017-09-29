module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'SignUpService', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, service) {
  var vm = this;
  vm.userCreate = function () {
    $state.go(UIState.SIGN_UP.USER_PROFILE);
    var formData = new FormData();
    var sigupData = {
      'first_name': vm.first_name,
      'last_name': vm.last_name,
      'company_name': vm.company_name,
      'phone_no': vm.phone_no,
      'email': vm.email,
      'password': vm.password
    };

    for (var key in sigupData) {
      formData.append('user[' + key + ']', sigupData[key]);
    }
    $log.info(formData);
    service.signUp(sigupData).then(function (result) {

    }).catch(function (err) {

    });
  };
}
