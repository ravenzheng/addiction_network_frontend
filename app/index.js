var appName = 'AddictionNetworkApp';

angular.module(appName, [
  'ngAnimate',
  'ui.router',
  'ui.bootstrap',
  'LocalStorageModule',
  require('./home'),
  require('./sponsorHome'),
  require('./treatmentCenterDetail'),
  require('./treatmentCenterMap'),
  require('./advertisement'),
  require('./myProfile'),
  require('./featuredTreatmentCenter'),
  // require('./addListing'),
  require('./aboutUs'),
  require('./contactUs'),
  require('./contactThank'),
  require('./insuranceThank'),
  require('./login'),
  require('./logout'),
  require('./blog'),
  require('./contactCustomer'),
  require('./contactCustomerThank'),
  require('./contactTreatmentCenter'),
  require('./contactTreatmentThank'),
  require('./loginHelp'),
  require('./insurance'),
  require('./searchState'),
  require('./signUp'),
  require('./privacyPolicy'),
  require('./adn'),
  require('./about')

]).component('header', require('./header'))
  .component('footer', require('./footer'))
  .constant('endPoint', require('./endPoint'))
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
  }])
  .config(['$urlRouterProvider', function ($urlRouterProvider) {
    // .when('/customers', route.resolve('Customers'))
    // $urlRouterProvider.otherwise('');
    $urlRouterProvider.otherwise(function () {
      angular.element(document).ready(function () {
        var path = angular.element(location).attr('pathname');
        var slug = path.replace('/', '');
        // var removeSlash = slug.replace('/', '');
        angular.element.get('//blog.addictionnetwork.com/blog/post_exist.php?slug=' + slug, function (data, status) {
          if (status === 'success') {
            if (data > 0) {
              window.location.href = '/blog/' + slug;
            } else {
              // $urlRouterProvider.otherwise('/');
              window.location.href = '/';
            }
          }
        });
      });
    });
  }]);

// eslint-disable-next-line angular/document-service
angular.bootstrap(document.getElementsByTagName('html')[0], [appName]);
