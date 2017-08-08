module.exports = ['$stateParams', '$rootScope', 'localStorageService', 'Status', '$state', 'UIState', ctrl];

function ctrl($stateParams, $rootScope, localStorageService, Status, $state, UIState) {
  if ($stateParams.auth_token) {
    localStorageService.set('token', $stateParams.auth_token);
    $rootScope.login = 1;
    $rootScope.$emit(Status.SUCCEEDED, 'You are logged in');
    // $window.location.href = '/my-profile/profile';
    $state.go(UIState.MY_PROFILE.PROFILE);
  }
}
