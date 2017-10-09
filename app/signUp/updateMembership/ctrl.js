module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'localStorageService', 'SignUpService', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, localStorageService, service) {
  var vm = this;
  var token = localStorageService.get('signupToken');
  vm.sponser = function () {
    localStorageService.set('membershipType', 'skipped', 'sessionStorage');
    $state.go(UIState.SIGN_UP.SPONSER);
  };
  vm.sponsored = function () {
    localStorageService.set('membershipType', 'sponsored', 'sessionStorage');
    setMembershipType('sponsored');

    // $state.go(UIState.ADD_LISTING.CENTER_INFO);
  //  $state.go(UIState.ADD_LISTING.PAYMENT_DETAILS);
  };
  vm.featured = function () {
    localStorageService.set('membershipType', 'featured', 'sessionStorage');
    setMembershipType('featured');

    // $state.go(UIState.ADD_LISTING.CENTER_INFO);
  //  $state.go(UIState.ADD_LISTING.PAYMENT_DETAILS);
  };
  function setMembershipType(type) {
    var formData = new FormData();
    var membership = {
      'package': type
    };
    for (var key in membership) {
      formData.append(key, membership[key]);
    }
    service.upgradeMembership(formData, token).then(function (result) {
      $log.info(result);
      $state.go(UIState.SIGN_UP.SPONSER);
    }).catch(function (err) {
      $log.info(err);
    });
  }
}
