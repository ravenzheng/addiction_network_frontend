module.exports = ['$log', '$scope', '$rootScope', ctrl];

function ctrl($log, $scope, $rootScope) {
  // initialize
  var vm = this;
  $rootScope.addListingStepDone = 7;
  $rootScope.hideSteps = [];
  $rootScope.showSteps = ['contactInfo', 'userInfo', 'paidMember', 'centerInfo', 'centerDetails', 'paymentDetails', 'sponsoredPage', 'bannerAd', 'featuredListing'];
  $rootScope.doneSteps = [];
  $rootScope.disableUserinfo = 0;
  // addlisting navigation control
  $scope.$on('$stateChangeStart',
    function (event, toState) {
      var tostate = toState.name.split('.');
      var step0 = ['contactInfo'];
      var step1 = step0.concat(['userInfo']);
      var step2 = step1.concat(['paidMember']);
      var step3 = step2.concat(['centerInfo']);
      var step4 = step3.concat(['centerDetails']);
      var step5 = step4.concat(['paymentDetails']);
      var step6 = step5.concat(['sponsoredPage']);
      var step7 = step6.concat(['bannerAd']);
      //  var step8 = step7.concat(['featuredListing']);

      var stepDone = $rootScope.addListingStepDone;
      if (tostate[0] === 'addListing') {
        if (stepDone === 0 && step0.indexOf(tostate[1]) === -1) {
          event.preventDefault();
        } else if (stepDone === 1 && step1.indexOf(tostate[1]) === -1) {
          event.preventDefault();
        } else if (stepDone === 2 && (step2.indexOf(tostate[1]) === -1)) {
          event.preventDefault();
        } else if (stepDone === 3 && (step3.indexOf(tostate[1]) === -1)) {
          event.preventDefault();
        } else if (stepDone === 4 && (step4.indexOf(tostate[1]) === -1)) {
          event.preventDefault();
        } else if (stepDone === 5 && (step5.indexOf(tostate[1]) === -1)) {
          event.preventDefault();
        } else if (stepDone === 6 && (step6.indexOf(tostate[1]) === -1)) {
          event.preventDefault();
        } else if (stepDone === 7 && (step7.indexOf(tostate[1]) === -1)) {
          event.preventDefault();
        }

        // trigger savestep for done steps, work like next button
        if (stepDone === 4 && tostate[1] === 'centerDetails') {
          $rootScope.saveStep4(); // only save the step
        }
        // prevent to display steps other than treatment center and center detail
        if ($rootScope.showSteps.indexOf(tostate[1]) === -1) {
          event.preventDefault();
        }
      }
    });

  $scope.$on('$stateChangeSuccess',
    function (event, toState) {
      var tostate = toState.name.split('.');
      // default
      vm.sideAdvertisement = 0;
      vm.colMd = 'col-md-8';

      // removing advertisemet sidebar for memebership section
      if ((tostate[0] === 'addListing' && tostate[1] === 'paidMember')) {
        vm.sideAdvertisement = 1;
        vm.colMd = 'col-md-12';
      }
      // if ((tostate[0] === 'addListing' && tostate[1] === 'paidMember') || (tostate[0] === 'addListing' && tostate[1] === 'sponsoredPage')) {
      //   vm.sideAdvertisement = 1;
      //   vm.colMd = 'col-md-12';
      // }
    });
}
