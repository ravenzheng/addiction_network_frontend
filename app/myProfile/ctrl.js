function ctrl(UserService) {
  var vm = this;
  UserService.queryProfile().then(function (profile) {
    vm.profile = profile;
  }).catch(function (error) {
    // todo, display in message in the frontend page
    console.log(error);
  });
}

module.exports = ['UserService', ctrl];
