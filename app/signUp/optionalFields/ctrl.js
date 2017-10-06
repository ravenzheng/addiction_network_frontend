module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'localStorageService', 'SignUpService', 'Status', ctrl];
function ctrl($injector, $scope, $log, $rootScope, $state, UIState, localStorageService, service, Status) {
  var vm = this;
  var rs = $rootScope;
  var token = localStorageService.get('signupToken');

  var initStartupVars = function () {
    vm.optionalInit = {};
    vm.optionalInit.description = 1;
    vm.optionalInit.overview = 1;
    vm.optionalInit.treatmentApproach = 1;
    vm.optionalInit.usp = 1;
    vm.explanationField = 'Explaination of each field here?';
  };
  initStartupVars();


  vm.updateMembership = function () {
    $state.go(UIState.SIGN_UP.UPDATE_MEMBERSHIP);
  };

  vm.optionalFieldsSubmit = function () {
    rs.$emit(Status.PROCESSING, Status.PROCESSING_MSG);
    var logo = rs.logoData;
    var gallery = rs.galleryData;
    if (angular.isUndefined(logo)) {
      logo = '';
    }
    var galleryData = '';
    if (angular.isDefined(gallery)) {
      var len = gallery.length;
      for (var i = 0; i < len; i++) {
        //  formData.append('treatment_center[image_data][]', imageData.item(i));
      //  galleryData.push(gallery.item(i));
        galleryData += gallery.item(i) + ',';
      }
      galleryData = galleryData.slice(',', -1);
    }

    var formData = new FormData();
    var optionalData = {
      'listing_image': logo,
      'description': vm.description,
      'content_1': vm.overview,
      'content_2': vm.treatmentApproach,
      'content_3': vm.usp,
      'content_4': '',
      'heading_1': '',
      'heading_2': '',
      'heading_3': '',
      'heading_4': '',
      'image_data': '[' + galleryData + ']'
    };
    for (var key in optionalData) {
      formData.append('treatment_center[' + key + ']', optionalData[key]);
    }

    var centerId = localStorageService.get('signupCenterId');
    if (angular.isUndefined(centerId)) {
      $log.info('Center id not defined');
      return;
    }

    service.addOptionalFields(formData, centerId, token).then(function (result) {
      $log.info(result);
      rs.$emit(Status.SUCCEEDED, 'Optional fields updated');
      $state.go(UIState.SIGN_UP.UPDATE_MEMBERSHIP);
    }).catch(function (err) {
      rs.$emit(Status.FAILED, err.data.error);
      $log.info(err);
    });
  };
}
