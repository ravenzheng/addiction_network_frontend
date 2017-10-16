module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'Status', 'UIState', 'SignUpService', 'localStorageService', '$timeout', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, Status, UIState, service, localStorageService, $timeout) {
  var vm = this;
  var lm = $rootScope;
  var token = localStorageService.get('signupToken');

  var initStartupVars = function () {
    vm.centerFormInit = {};
    vm.centerFormInit.categories = 1;
    vm.centerFormInit.centerName = 1;
    vm.centerFormInit.website = 1;
    vm.centerFormInit.email = 1;
    vm.centerFormInit.phone = 1;
    vm.centerFormInit.address = 1;
    vm.displayMsg = 'Explaination of each field here?';
  };
  initStartupVars();

  vm.multiselectModelSettings = {
    scrollableHeight: '160px',
    scrollable: true,
    checkBoxes: true,
    showCheckAll: false,
    showUncheckAll: false,
    smartButtonMaxItems: 1,
    // smartButtonTextConverter: function () {
    //   return 'Category';
    // },
    required: true
  };
  vm.categorySelectText = {
    buttonDefaultText: 'Select Category'
  };
  vm.tagsSelectText = {
    buttonDefaultText: 'Tags'
  };
  vm.centerCategories = [];
  vm.categoryModel = [];
  vm.tagsOption = [
    {
      'id': 5,
      'label': 'Cocaine Rehab Centers',
      'tagGroup': '4'
    },
    {
      'id': 6,
      'label': 'Opiate Addiction Centers',
      'tagGroup': '4'
    },
    {
      'id': 14,
      'label': 'Executive Treatment',
      'tagGroup': '13'
    },
    {
      'id': 15,
      'label': 'Rehab for Women',
      'tagGroup': '13'
    }
  ];

  vm.tagsData = [];
  vm.tagCheckboxModel = [];
  vm.tagsToggleFun = function () {
    if (vm.tagsToggle === 1) {
      vm.tagsToggle = 0;
    } else {
      vm.tagsToggle = 1;
    }
  };
  vm.tagToggleDynamic = function (tagsId) {
    $log.info('tagsid: ' + tagsId);
    if (vm.tagToggle[tagsId]) {
      vm.tagToggle[tagsId] = 0;
    } else {
      vm.tagToggle[tagsId] = 1;
    }
  };

  // get categories
  service.getCategories(token).then(function (result) {
    $log.info(result);
    for (var key in result.categories) {
      var category = {
        'label': result.categories[key].name,
        'id': result.categories[key].id
      };
      vm.centerCategories.push(category);
    }
  }).catch(function (err) {
    $log.info(err);
  });

  // get tags selection
  service.getTagsSelection(token).then(function (result) {
    $log.info(result);
    // for (var key in result.tags) {
    //   var category = {'label': result.tags[key].name, 'id': result.tags[key].id};
    //   vm.centerCategories.push(category);
    // }
    vm.tagsData = result;
  }).catch(function (err) {
    $log.info(err);
  });

  vm.onCategorySelect = function () {
    vm.centerFormInit.categories = 0;
  };
  vm.onCategoryDeSelect = function () {
    vm.centerFormInit.categories = 0;
  };

  function shakeme() {
    angular.element('.progress-img-wrap').addClass('shake');
    $timeout(function () {
      angular.element('.shake').removeClass('shake');
    }, 500);
  }

  vm.addCenter = function () {
    //  lm.$emit(Status.PROCESSING, Status.PROCESSING_MSG);
    var catId = '';
    $log.info(vm.categoryModel);
    for (var key in vm.categoryModel) {
      catId += vm.categoryModel[key].id + ',';
    }
    catId = catId.slice(',', -1);
    if (vm.centerForm.centerName.$error.required) {
      // lm.$emit(Status.FAILED, 'Please enter Center name');
      shakeme();
      vm.displayMsg = 'Please enter Center name';
      return;
    } else if (vm.categoryModel.length === 0) {
      shakeme();
      vm.displayMsg = 'Please select Category';
      return;
    } else if (vm.centerForm.website.$error.required) {
      shakeme();
      vm.displayMsg = 'Please enter Website';
      return;
    } else if (vm.centerForm.website.$error.pattern) {
      shakeme();
      vm.displayMsg = 'Invalid website';
      return;
    } else if (vm.centerForm.email.$error.required) {
      shakeme();
      vm.displayMsg = 'Please enter Email address';
      return;
    } else if (vm.centerForm.email.$error.pattern) {
      shakeme();
      vm.displayMsg = 'Invalid email';
      return;
    } else if (vm.centerForm.phone.$invalid) {
      shakeme();
      vm.displayMsg = 'Invalid phone';
      return;
    } else if (vm.centerForm.address.$invalid) {
      shakeme();
      vm.displayMsg = 'Please enter Address';
      return;
    }
    var tagIds = '';
    if (angular.isDefined(vm.tagCheckboxModel) && vm.tagCheckboxModel.length > 0) {
      for (key in vm.tagCheckboxModel) {
        if (vm.tagCheckboxModel[key]) {
          tagIds += key + ',';
        }
        // $log.info('key: ' + key + ' value: ' + vm.tagCheckboxModel[key]);
      }
    }
    tagIds = tagIds.slice(0, -1);

    var formData = new FormData();
    var centerData = {
      'center_name': vm.centerName,
      'category_id': catId,
      'center_web_link': vm.website,
      'email': vm.email,
      'phone': vm.phone,
      'tag_id': tagIds,
      'address_line_1': vm.address
    };

    for (key in centerData) {
      formData.append('treatment_center[' + key + ']', centerData[key]);
    }

    service.addCenter(formData, token).then(function (result) {
      localStorageService.set('signupCenterId', result.treatment_center.id);
      lm.$emit(Status.SUCCEEDED, Status.SIGNUP_CENTER);
      $state.go(UIState.SIGN_UP.OPTIONAL_FIELDS);
    }).catch(function (err) {
      // lm.$emit(Status.FAILED, err.data.error);
      $log.info(err);
      vm.error = '';
      if (angular.isDefined(err.data.treatment_center.email.errors)) {
        vm.error = err.data.treatment_center.email.errors[0];
        $log.info(vm.error);
      }
      lm.$emit(Status.FAILED, vm.error);
      // $log.info(err);
    });
  };
}
