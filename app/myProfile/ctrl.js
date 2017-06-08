module.exports = ['$rootScope', '$log', '$window', 'UserService', 'localStorageService', ctrl];

function ctrl($rootScope, $log, $window, UserService, localStorageService) {
  var vm = this;
  $rootScope.profileData = [];
  var token = localStorageService.get('token');
  localStorageService.set('loginToken', token, 'sessionStorage'); // setting extra same token in different variable to fix logout issue

  var profileData = localStorageService.get('profileData', 'sessionStorage');
  if (profileData !== null) {
    vm.profile = profileData;
    localStorageService.remove('profileData');
  }

  UserService.queryProfile().then(function (result) {
    vm.profile = result.user;
    $rootScope.profileData = result.user;
    localStorageService.set('profileData', result.user, 'sessionStorage');
  }).catch(function (error) {
    // todo, display in message in the frontend page
    // $window.location.href = '/#logout';
    $log.error(error);
  });
}
