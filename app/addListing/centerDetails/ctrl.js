module.exports = ['$rootScope', '$log', '$state', '$injector', 'UIState', 'MapService', 'TreatmentCenterService', 'Status', 'localStorageService', ctrl];

function ctrl($rootScope, $log, $state, $injector, UIState, mapService, service, Status, localStorageService) {
  // todo
  // var vm = this;
  var vm = $rootScope; // this;
  var lm = this;
  lm.previous = function () {
    $state.go(UIState.ADD_LISTING.CENTER_INFO);
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
    var token = localStorageService.get('signupToken');
    service.addTreatmentCenter(formData, token).then(function () {
      $rootScope.$emit(Status.SUCCEEDED, Status.SIGNUP_CENTER);
      $rootScope.centerReset = 1;
      resetForm();
      addAgainPrompt(lm, $injector, $rootScope, $state, UIState);
      // $state.go(UIState.ADD_LISTING.PAID_MEMBER);
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

  function resetForm() {
    vm.content_1 = null;
    vm.content_2 = null;
    vm.content_3 = null;
  }
}

function addAgainPrompt(vm, $injector, $rootScope, $state, UIState) {
  var deletePrompt = '<div class="modal-header"><h3 class="modal-title" id="modal-title">Treatment Center Added</h3></div><div class="modal-body text-left" id="modal-body">Add more treatment center?</div><div class="modal-footer"><button class="btn adn-btn" type="button" ng-click="ok()"> OK </button><div style="position: absolute;top: -10px;text-align: right;width: 100%;cursor: pointer;border-radius: 100%;" ng-click="cancel()"><i class="fa fa-times fa-1" aria-hidden="true" style="position: absolute;top: 0px; font-size: 24px;border-radius: 100%;"></i></div></div>';
  vm.open = function () {
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
  vm.open();
}
