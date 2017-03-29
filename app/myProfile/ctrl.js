module.exports = ['$log', 'UserService', ctrl];

function ctrl($log, UserService) {
  var vm = this;
  UserService.queryProfile().then(function (profile) {
    vm.profile = profile;
  }).catch(function (err) {
    $log.error(err);
  });
}
