module.exports = ['$rootScope', '$log', '$state', 'UIState', 'MapService', 'TreatmentCenterService', 'Status', 'localStorageService', ctrl];

function ctrl($rootScope, $log, $state, UIState, mapService, service, Status, localStorageService) {
  // todo
  // var vm = this;
  var vm = $rootScope; // this;
  var lm = this;
  lm.previous = function () {
    $state.go(UIState.ADD_LISTING.CENTER_INFO);
  };
  $rootScope.activeLink = 'Treatment Center Details';
  vm.submit = function () {
    var formData = new FormData();
    //  formData = $rootScope.formdata;
    // if (vm.center_name !== '') {
    var treatmentcenterData = {
      'center_name': vm.centerInfo.center_name,
      'description': vm.centerInfo.description,
      'center_web_link': vm.centerInfo.center_web_link,
      'listing_image': vm.centerInfo.listing_image,
      'heading_1': 'Overview of Program',
      'heading_2': 'Treatment Approach',
      'heading_3': 'Unique Selling Points',
      'address_line_1': vm.centerInfo.address_line_1,
      'city': vm.centerInfo.city,
      'pincode': vm.centerInfo.pincode,
      'state': vm.centerInfo.state,
      'phone': vm.centerInfo.intakephone,
      'email': vm.centerInfo.intakeemail,
      'featured': false,
      'listing_type': 'free',
      'content_1': vm.content_1,
      'content_2': vm.content_2,
      'content_3': vm.content_3
    };
    for (var key in $rootScope.centerInfo) {
      formData.append('treatment_center[' + key + ']', $rootScope.centerInfo[key]);
    }
    for (key in treatmentcenterData) {
      formData.append('treatment_center[' + key + ']', treatmentcenterData[key]);
    }
    //  }
    var imageData = vm.image_data;
    if (imageData) {
      var len = imageData.length;
      for (var i = 0; i < len; i++) {
        formData.append('treatment_center[image_data][]', imageData.item(i));
      }
    }

    // $log.info('final');
    // for (key in formData) {
    //   $log.info('key: ' + key + '  data' + formData);
    // }
    // return;
    vm.email_err = '';
    vm.pass_err = '';
    vm.intakeemail_err = '';
    var token = localStorageService.get('signupToken');
    service.addTreatmentCenter(formData, token).then(function () {
      $rootScope.$emit(Status.SUCCEEDED, Status.SIGNUP_CENTER);
      $state.go(UIState.ADD_LISTING.PAID_MEMBER);
      //  $window.location.href = '/#/login';
    }).catch(function (err) {
      if (err.data.user) {
        if (angular.isDefined(err.data.user.email)) {
          var emailError = err.data.user.email.errors[0];
          $rootScope.$emit(Status.FAILED, emailError);
        }
        if (angular.isDefined(err.data.user.password)) {
          var passError = err.data.user.password.errors[0];
          $rootScope.$emit(Status.FAILED, passError);
        }
        if (angular.isDefined(err.data.user.username)) {
          var userError = err.data.user.username.errors[0];
          $rootScope.$emit(Status.FAILED, userError);
        }
      }
    });
  };
}
