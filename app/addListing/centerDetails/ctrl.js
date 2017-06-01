module.exports = ['$scope', '$document', '$rootScope', '$log', '$state', '$injector', 'UIState', 'MapService', 'TreatmentCenterService', 'Status', 'localStorageService', ctrl];

function ctrl($scope, $document, $rootScope, $log, $state, $injector, UIState, mapService, service, Status, localStorageService) {
  // todo
  // var vm = this;
  var vm = $rootScope; // this;
  var lm = this;
  lm.previous = function () {
    $state.go(UIState.ADD_LISTING.CENTER_INFO);
  };

  lm.skipStep = function () {
    $rootScope.doneSteps = $rootScope.doneSteps.concat(['centerDetails']);
    $rootScope.addListingStepDone = 5;
    $state.go(UIState.ADD_LISTING.PAYMENT_DETAILS);
  };

  lm.finish = function () {
    $state.go(UIState.LOGIN);
  };
  // vm.popup = function () {
  //   addAgainPrompt(lm, $injector, $rootScope, $state, UIState);
  // };
  $rootScope.activeLink = 'Treatment Center Details';
  vm.submit = function () {
    var formData = new FormData();
    var treatmentcenterData = {
      'heading_1': 'Overview of Program',
      'heading_2': 'Treatment Approach',
      'heading_3': 'Unique Selling Points',
      'content_1': vm.content_1,
      'content_2': vm.content_2,
      'content_3': vm.content_3
    };
    for (var key in $rootScope.centerInfo) {
      if (key === 'phone_validated') {
        continue;
      }
      formData.append('treatment_center[' + key + ']', $rootScope.centerInfo[key]);
    }
    for (key in treatmentcenterData) {
      formData.append('treatment_center[' + key + ']', treatmentcenterData[key]);
    }

    var imageData = vm.image_data;
    if (imageData) {
      var len = imageData.length;
      for (var i = 0; i < len; i++) {
        formData.append('treatment_center[image_data][]', imageData.item(i));
      }
    }
    vm.email_err = '';
    vm.pass_err = '';
    vm.intakeemail_err = '';

    // saving to localStorageService
    if (localStorageService.isSupported) {
      localStorageService.set('addListingCenterDetails', treatmentcenterData, 'sessionStorage');
    }

    var token = localStorageService.get('signupToken');

    service.queryListAll(token).then(function (response) {
      // test for center exist or not
      var centerName = $rootScope.centerInfo.center_name;
      var centerExist = 0;
      for (key in response.treatment_centers) {
        if (centerName === response.treatment_centers[key].center_name) {
          centerExist = 1;
          break;
        }
      }
      if (centerExist === 1) {
        $rootScope.$emit(Status.FAILED, 'Treatment center already exist.');
        return;
      }
      var canSkip = localStorageService.get('addListingCanSkip', 'sessionStorage');
      service.addTreatmentCenter(formData, token).then(function () {
        $rootScope.$emit(Status.SUCCEEDED, Status.SIGNUP_CENTER);
        // form will be reset
        $rootScope.centerReset = 1; // reset on
        lm.resetForm(); // reset on
        localStorageService.remove('addListingCenterInfo', 'addListingCenterDetails');
        if (canSkip !== null) {
          canSkip.centerSkip = 1;
        } else {
          canSkip = {
            'centerSkip': 1
          };
        }
        $rootScope.centerSkip = 1;
        localStorageService.set('addListingCanSkip', canSkip, 'sessionStorage');

        if (angular.isDefined($rootScope.centerAdded)) {
          len = $rootScope.centerAdded.length;
          $rootScope.centerAdded[len] = centerName;
        } else {
          $rootScope.centerAdded = [centerName];
        }
        addAgainPrompt(lm, vm, $injector, $rootScope, $state, UIState);
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
    });
  };

  lm.resetForm = function () {
    vm.content_1 = null;
    vm.content_2 = null;
    vm.content_3 = null;
  };

  // render form with values if stored in sessionStorage/localstorage
  if (angular.isDefined(localStorageService.get('addListingCenterDetails', 'sessionStorage'))) {
    var info = localStorageService.get('addListingCenterDetails', 'sessionStorage');
    if (info !== null) {
      vm.content_1 = info.content_1;
      vm.content_2 = info.content_2;
      vm.content_3 = info.content_3;
    }
  }
  // get payment skip detail
  if (angular.isDefined(localStorageService.get('addListingCanSkip', 'sessionStorage'))) {
    var canSkip = localStorageService.get('addListingCanSkip', 'sessionStorage');
    if (canSkip !== null) {
      vm.centerSkip = canSkip.centerSkip;
    }
  }

  // Uploaded image preview
  $scope.uploadImagePreview = function (element) {
    var reader = new FileReader();
    reader.readAsDataURL(element.files[0]);
    reader.onload = function (e) {
      vm.preview_img = e.target.result;
      $document[0].getElementById('logo_preview').src = vm.preview_img;
    };
  };
}

function addAgainPrompt(lm, vm, $injector, $rootScope, $state, UIState) {
  var deletePrompt = '<div class="modal-header"><h7 class="modal-title" id="modal-title"><table><tbody><tr> <td ng-repeat="center in $root.centerAdded">{{center}}, </td></tr></tbody></table></h7></div><div class="modal-body text-left" id="modal-body">Add more treatment center?</div><div class="modal-footer"><button class="btn adn-btn small_button" type="button" ng-click="ok()"> YES </button><div><i class="fa fa-times fa-1" aria-hidden="true" style="position: absolute;top: 8px;right:18px; font-size: 24px;border-radius: 100%;" ng-click="cancel()"></i></div></div>';
  lm.open = function () {
    var modalInstance = $injector.get('$uibModal').open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      template: deletePrompt,
      windowClass: 'treatment_center_class',
      controller: function () {
        $rootScope.ok = function () {
          modalInstance.close();
          $state.go(UIState.ADD_LISTING.CENTER_INFO);
        };
        $rootScope.cancel = function () {
          modalInstance.close();
          modalInstance.dismiss('cancel');
          $rootScope.addListingStepDone = 5;
          $rootScope.doneSteps = $rootScope.doneSteps.concat(['centerDetails']);
          $state.go(UIState.ADD_LISTING.PAYMENT_DETAILS);
        };
      },
      bindToController: true
    });
  };
  lm.open();
}
