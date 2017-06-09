function ctrl($log, $rootScope, Status, $state, UIState, service) {
  var vm = this;
  var creditCardType = require('credit-card-type');
  vm.cardType = 'credit';

  vm.detectCardType = function (card, event) {
    if (angular.isDefined(card)) {
      var cardVal = card.replace(/ /g, '');
      vm.cardType = creditCardType(cardVal);
      if (angular.isDefined(vm.cardType[0])) {
        if (vm.cardType[0].type === 'master-card') {
          vm.cardType = 'master';
        } else if (vm.cardType[0].type === 'visa') {
          vm.cardType = 'visa';
        } else if (vm.cardType[0].type === 'american-express') {
          vm.cardType = 'amex';
        } else {
          vm.cardType = 'credit';
        }
      }

      vm.totalDigits = card.length;
      if (event.keyCode !== 8) {
        if (vm.totalDigits === 4) {
          vm.card = vm.card + ' ';
        } else if (vm.totalDigits === 9) {
          vm.card = vm.card + ' ';
        } else if (vm.totalDigits === 14) {
          vm.card = vm.card + ' ';
        }
      }
    } else {
      vm.cardType = null;
      vm.totalDigits = 0;
      vm.cardType = 'credit';
    }
  };

  vm.validateMonth = function () {
    vm.validMonth = 0;
    var date = new Date();
    var curYear = date.getFullYear();
    var curMonth = date.getMonth();
    if (angular.isDefined(vm.year)) {
      if (vm.year > curYear) {
        vm.validMonth = 1;
      } else if (parseInt(vm.year, 10) === curYear) {
        if (parseInt(vm.month, 10) > (curMonth)) {
          vm.validMonth = 1;
        }
      }
    }
  };

  vm.resetForm = function () {
    vm.card = null;
    vm.firstName = null;
    //  vm.middleName = null;
    vm.lastName = null;
    vm.year = null;
    vm.month = null;
    vm.cvv = null;
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
      // 'middle_name': vm.middleName,
      'last_name': vm.lastName,
      'expiry_year': vm.year,
      'expiry_month': vm.month,
      'card_code': vm.cvv
      //  'default': vm.default
    };

    for (var key in paymentData) {
      formData.append('payment[' + key + ']', paymentData[key]);
    }
    service.paymentDetailsAdd(formData).then(function () {
      $rootScope.$emit(Status.SUCCEEDED, Status.PAYMENT_ADD_SUCCEESS_MSG);
      vm.resetForm();
    }).catch(function (err) {
      $log.error(err);
      $rootScope.$emit(Status.FAILED, err.data.error);
    });
  };
}

module.exports = ['$log', '$rootScope', 'Status', '$state', 'UIState', 'PaymentService', ctrl];
