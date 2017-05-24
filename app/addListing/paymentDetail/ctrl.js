function ctrl($log, $rootScope, Status, $window, $state, UIState, localStorageService, service) {
  // var vm = this;
  var vm = $rootScope;
  var lm = this;
  $rootScope.activeLink = 'Payment';
  var creditCardType = require('credit-card-type');
  lm.cardType = 'credit';

  // get values if stored in sessionStorage/localstorage
  if (angular.isDefined(localStorageService.get('addListingPaymentDetail', 'sessionStorage'))) {
    var info = localStorageService.get('addListingPaymentDetail', 'sessionStorage');
    if (info !== null) {
      vm.card = info.card_no;
      vm.firstName = info.first_name;
      vm.middleName = info.middle_name;
      vm.lastName = info.last_name;
      vm.year = info.expiry_year;
      vm.month = info.expiry_month;
      vm.cvv = info.card_code;
    }
  }

  vm.detectCardType = function (card, event) {
    if (angular.isDefined(card)) {
      var cardVal = card.replace(/ /g, '');
      vm.cardType = creditCardType(cardVal);
      if (angular.isDefined(vm.cardType[0])) {
        if (vm.cardType[0].type === 'master-card') {
          lm.cardType = 'master';
        } else if (vm.cardType[0].type === 'visa') {
          lm.cardType = 'visa';
        } else if (vm.cardType[0].type === 'american-express') {
          lm.cardType = 'amex';
        } else {
          lm.cardType = 'credit';
        }
      }

      lm.totalDigits = card.length;
      if (event.keyCode !== 8) {
        if (lm.totalDigits === 4) {
          vm.card = vm.card + ' ';
        } else if (lm.totalDigits === 9) {
          vm.card = vm.card + ' ';
        } else if (lm.totalDigits === 14) {
          vm.card = vm.card + ' ';
        }
      }
    } else {
      vm.cardType = null;
      lm.totalDigits = 0;
      lm.cardType = 'credit';
    }
  };
  lm.previous = function () {
    $state.go(UIState.ADD_LISTING.CENTER_DETAILS);
  };
  var curYear = new Date().getFullYear();
  vm.testYear = function () {
    vm.curYear = curYear;
  };
  vm.middleName = '';
  vm.submit = function () {
    // validating file type
    var card = vm.card.replace(/ /g, '');
    vm.err_type = 0;
    if (angular.isUndefined(vm.year)) {
      vm.yearError = 'Please select year';
      return;
    }
    if (angular.isUndefined(vm.month)) {
      vm.monthError = 'Please select month';
      return;
    }
    var formData = new FormData();
    var paymentData = {
      'card_no': card,
      'first_name': vm.firstName,
      'middle_name': vm.middleName,
      'last_name': vm.lastName,
      'expiry_year': vm.year,
      'expiry_month': vm.month,
      'card_code': vm.cvv
      //  'default': vm.default
    };
    // saving to localStorageService
    if (localStorageService.isSupported) {
      localStorageService.set('addListingPaymentDetail', paymentData, 'sessionStorage');
    }
    for (var key in paymentData) {
      formData.append('payment[' + key + ']', paymentData[key]);
    }
    var token = localStorageService.get('signupToken');
    service.paymentDetailsAddSignup(formData, token).then(function () {
      $rootScope.$emit(Status.SUCCEEDED, Status.PAYMENT_ADD_SUCCEESS_MSG);
      $rootScope.addListingStepDone = 6;
      $rootScope.doneSteps = $rootScope.doneSteps.concat(['paymentDetails']);
      $state.go(UIState.ADD_LISTING.SPONSORED_PAGES);
    }).catch(function (err) {
      $log.error(err);
      $rootScope.$emit(Status.FAILED, err.data.error);
    });
  };
}

module.exports = ['$log', '$rootScope', 'Status', '$window', '$state', 'UIState', 'localStorageService', 'PaymentService', ctrl];
