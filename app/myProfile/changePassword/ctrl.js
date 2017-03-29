function ctrl($log, service) {
  var vm = this;
  vm.submit = submit;

  function submit() {
    var formData = new FormData();
    formData.append('user[old_password]', vm.oldPassword);
    formData.append('user[password]', vm.password);
    formData.append('user[password_confirmation]', vm.passwordConfirmation);
    service.changePassword(formData).then(function ( /* result */ ) {
      // update status in the page
    }).catch(function (error) {
      $log.error(error.message);
    });
  }
}

module.exports = ['$log', 'UserService', ctrl];
