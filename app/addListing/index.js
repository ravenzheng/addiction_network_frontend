var moduleName = 'app.addTreatmentCenterSignUp';

angular.module(moduleName, [
  'ui.router',
  'angularjs-dropdown-multiselect',
  require('../components'),
  require('../services')
])
  .directive('phoneInput', ['$filter', '$browser', function ($filter, $browser) {
    return {
      require: 'ngModel',
      link: function ($scope, $element, $attrs, ngModelCtrl) {
        var listener = function () {
          var value = $element.val().replace(/[^0-9]/g, '');
          $element.val($filter('tel')(value, false));
        };

        // This runs when we update the text field
        ngModelCtrl.$parsers.push(function (viewValue) {
          return viewValue.replace(/[^0-9]/g, '').slice(0, 10);
        });

        // This runs when the model gets updated on the scope directly and keeps our view in sync
        ngModelCtrl.$render = function () {
          $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
        };

        $element.bind('change', listener);
        $element.bind('keydown', function (event) {
          var key = event.keyCode;
          // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
          // This lets us support copy and paste too
          if (key === 91 || (key > 15 && key < 19) || (key >= 37 && key <= 40)) {
            return;
          }
          $browser.defer(listener); // Have to do this or changes don't get picked up properly
        });

        $element.bind('paste cut', function () {
          $browser.defer(listener);
        });
      }
    };
  }])
  .filter('tel', function () {
    return function (tel) {
      if (!tel) {
        return '';
      }
      var value = tel.toString().trim().replace(/^\+/, '');

      if (value.match(/[^0-9]/)) {
        return tel;
      }
      var city, number;
      switch (value.length) {
      case 1:
      case 2:
      case 3:
        city = value;
        break;

      default:
        city = value.slice(0, 3);
        number = value.slice(3);
      }

      if (number) {
        if (number.length > 3) {
          number = number.slice(0, 3) + '-' + number.slice(3, 7);
        } else {
          number = number;
        }
        return ('(' + city + ') ' + number).trim();
      }
      return '(' + city;
    };
  })
  .component('contactInfo', require('./contactInfo'))
  .component('userInfo', require('./userInfo'))
  .component('centerInfo', require('./centerInfo'))
  .component('centerDetails', require('./centerDetails'))
  .component('formNavSection', require('./formNavSection'))
  .component('paidMember', require('./paidMember'))
  .component('paymentDetail', require('./paymentDetail'))
  .component('sponsoredPage', require('./sponsoredPage'))
  .component('bannerAd', require('./bannerAd'))
  .component('sponsoredStateSelect', require('./sponsoredStateSelect'))
  .component('addListing', {
    template: require('./view.html'),
    controller: require('./ctrl')
  }).config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.ADD_LISTING.INDEX,
      url: '/add-listing',
      abstract: true,
      template: '<add-Listing></add-Listing>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.CONTACT_INFO,
      url: '/step1',
      template: '<contact-info></contact-info>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.USER_INFO,
      url: '/step2',
      template: '<user-info></user-info>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.PAID_MEMBER,
      url: '/step3',
      template: '<paid-member></paid-member>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.CENTER_INFO,
      url: '/step4',
      template: '<center-info></center-info>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.CENTER_DETAILS,
      url: '/step5',
      template: '<center-details></center-details>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.PAYMENT_DETAILS,
      url: '/step6',
      template: '<payment-detail></payment-detail>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.SPONSORED_PAGES,
      url: '/step7',
      template: '<sponsored-page></sponsored-page>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.BANNER_AD,
      url: '/step8',
      template: '<banner-ad></banner-ad>'
    });
  }]);

module.exports = moduleName;
