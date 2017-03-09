var angular = require('angular'),
  // ngRoute = require('angular-route'),
  moduleName = 'app.advertisement';

angular.module(moduleName, ['ngRoute'])
  .controller('AdvertisementCtrl', ["$scope", "$http", function($scope, $http) {
	$http({
		  method: 'GET',
		  url: 'https://ancient-everglades-10056.herokuapp.com/advertisements',
		}).then(function successCallback(response) {
			$scope.header_adv_banner = response.data.advertisements.header;
			$scope.footer_adv_banner = response.data.advertisements.footer;
			$scope.sidebar_adv_banner = response.data.advertisements.side_bar;
		  }, function errorCallback(response) {
			$scope.advertisements = response.statusText;
		  });
	}]);

module.exports = moduleName;