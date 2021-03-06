module.exports = ['$state', '$rootScope', '$log', '$window', 'UserService', 'localStorageService', ctrl];

function ctrl($state, $rootScope, $log, $window, UserService, localStorageService) {
  var vm = this;
  $rootScope.profileData = [];
  var token = localStorageService.get('token');
  localStorageService.set('loginToken', token, 'sessionStorage'); // setting extra same token in different variable to fix logout issue
  var profileData = localStorageService.get('profileData', 'sessionStorage');
  if (profileData !== null) {
    vm.profile = profileData;
    localStorageService.remove('profileData');
  }

  // $state.reload();
  UserService.queryProfile().then(function (result) {
    vm.profile = result.user;
    // console.log('profile data from api: ' + vm.profile);
    $rootScope.profileData = result.user;
    localStorageService.set('profileData', result.user, 'sessionStorage');
  }).catch(function (error) {
    // todo, display in message in the frontend page
    // $window.location.href = '/#logout';
    $log.error(error);
  });
}
