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
  require('./addListing'),
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
  require('./signUp')

]).component('header', require('./header'))
  .component('footer', require('./footer'))
  .constant('endPoint', require('./endPoint'))
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
  }])
  .controller('rootCtrl', function ($scope, $location, $rootScope) {
    $scope.$on('$stateChangeSuccess', function changedPage() {
      var path = $location.path();
      $rootScope.url = $location.absUrl();
      var replaceSlash = path.replace('/', '');
      words = replaceSlash.split('-');
      for (var i = 0; i < words.length; i++) {
        var word = words[i];
        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
      }
      var title = words.join(' ');
      if (title) {
        //  $scope.title = title.replace(/\/$/, '');
        // $rootScope.testing = 'besting';
      } else {
        $rootScope.title = 'Addiction Network';
        $rootScope.description = 'Addiction Network is an entirely free, comprehensive service designed to assist anyone seeking substance abuse and addiction treatment for themselves, or a loved one, the find the best rehab available. Our services are here to assist in providing every level of care and every different type of facility available in the industry. The site was designed to address the growing need to make addiction treatment options available to anyone. With so many people in America struggling with addiction, alcoholism, and substance abuse, the founders of Addiction Network noticed that it was extremely difficult for the average person to easily access the various treatment options that are out there. This makes finding a rehab that works, for your specific needs, very difficult.';
      }

    });
    // });
  })
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
