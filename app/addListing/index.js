var angular = require('angular'),
  ctrl = require('./ctrl'),
  htmlTemplate = require('./view.html'),
  //htmlTemplate_with_map = require('./treatment-center-map.html'),
 
  service = require('./service'),
  //directive = require('./directive'),
  
  moduleName = 'app.addTreatmentCenter';

angular.module(moduleName, [
    'ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/center-detail/', {
      template: htmlTemplate,
      controller: 'AddTreatmentCenterCtrl'
    });
  }])
  .factory('addTreatmentCenterService', service) //.factory('AddlistDirectivee', directive)

  .directive('ngFiles', ['$parse', function ($parse) {

            function fn_link(scope, element, attrs) {
                var onChange = $parse(attrs.ngFiles);
                element.on('change', function (event) {
                    onChange(scope, { $files: event.target.files });
                });
            };

            return {
                link: fn_link
            }
        } ])
	.directive("validPasswordC", function() {
		return {
				require: 'ngModel',
				scope: {
					reference: '=validPasswordC'
				},
				link: function(scope, elm, attrs, ctrl) {
					ctrl.$parsers.unshift(function(viewValue, $scope) {
						var noMatch = viewValue != scope.reference
						ctrl.$setValidity('noMatch', !noMatch);
						return (noMatch)?noMatch:!noMatch;
				  });

				  scope.$watch("reference", function(value) {
					ctrl.$setValidity('noMatch', value === ctrl.$viewValue);

				  });
				}
		  }
	})

  .controller('AddTreatmentCenterCtrl', ctrl);

module.exports = moduleName;
