function ctrl($log, UserService) {
  var vm = this;
  UserService.latestPost().then(function (result) {
    vm.result = result.data;
  }).catch(function (errors) {
    // todo, display the error message in the page.
    $log.error(errors);
  });
}

module.exports = ['$log', 'UserService', ctrl];
