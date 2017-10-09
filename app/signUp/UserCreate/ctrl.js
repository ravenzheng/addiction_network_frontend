module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'SignUpService', 'Status', 'localStorageService', '$document', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, service, Status, localStorageService, $document) {
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
    vm.phoneErrorTxt = 'Invalid Phone Number';
  };

  initStartupVars();

  // show and hide password

  vm.showpassword = function () {
    var password = angular.element($document[0].querySelector('#pwd'));
    var showpassword = angular.element($document[0].querySelector('#showpassword'));
    showpassword.removeAttr('class');
    if (password.attr('type') === 'password') {
      password.attr('type', 'text');
      showpassword.attr('class', 'fa fa-eye fa-2x');
    } else {
      password.attr('type', 'password');
      showpassword.attr('class', 'fa fa-eye-slash fa-2x');
    }
  };

  vm.userCreate = function () {
    var lm = $rootScope; // this;

    var firstName = vm.first_name;
    var lastName = vm.last_name;
    var company = vm.company_name;
    var phone = vm.phone_num;
    var password = vm.password;
    var username = vm.phone_num + vm.first_name;
    var email = vm.email;

    if (angular.isUndefined(firstName) || firstName === '') {
      lm.$emit(Status.FAILED, 'Please enter First name');
      return;
    } else if (angular.isUndefined(lastName) || lastName === '') {
      lm.$emit(Status.FAILED, 'Please enter Last name');
      return;
    } else if (angular.isUndefined(company) || company === '') {
      lm.$emit(Status.FAILED, 'Please enter Company name');
      return;
    } else if (angular.isUndefined(phone) || phone === '') {
      lm.$emit(Status.FAILED, 'Please enter Phone number');
      return;
    } else if (angular.isUndefined(email) || email === '') {
      lm.$emit(Status.FAILED, 'Please enter Email address');
      return;
    }
    var formData = new FormData();
    var sigupData = {
      'first_name': firstName,
      'last_name': lastName,
      'company': company,
      'phone': phone,
      'email': email,
      'password': password,
      'username': username
    };

    for (var key in sigupData) {
      formData.append('user[' + key + ']', sigupData[key]);
    }
    // $log.info(formData);
    service.signUp(formData).then(function (result) {
      lm.$emit(Status.FAILED, 'User has been successfully created');
      localStorageService.set('signupToken', result.user.auth_token);
      $state.go(UIState.SIGN_UP.USER_PROFILE);
      $log.info(result);
    }).catch(function (err) {
      // lm.$emit(Status.FAILED, err.data.error);
      if (angular.isDefined(err.data.user.password)) {
        vm.pwdRequiredTxt = err.data.user.password.errors[0];
        vm.error = err.data.user.password.errors[0];
      } else {
        vm.pwdRequiredTxt = 'Required';
      }
      if (angular.isDefined(err.data.user.email)) {
        vm.emailErrorTxt = err.data.user.email.errors[0];
        vm.error = err.data.user.email.errors[0];
      } else {
        vm.emailErrorTxt = '';
      }
      if (angular.isDefined(err.data.user.phone)) {
        vm.phoneErrorTxt = err.data.user.phone.errors[0];
        vm.error = err.data.user.phone.errors[0];
      } else {
        vm.phoneErrorTxt = 'Invalid Phone Number';
      }
      lm.$emit(Status.FAILED, vm.error);
      //  $log.info(err);
    });
  };
}
