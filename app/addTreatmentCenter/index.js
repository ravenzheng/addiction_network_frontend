var angular = require('angular'),
  ctrl = require('./ctrl'),
  htmlTemplate = require('./view.html'),
  //htmlTemplate_with_map = require('./treatment-center-map.html'),
 
  service = require('./service'),
  //directive = require('./directive'),
  
  moduleName = 'app.addListing';

angular.module(moduleName, [
    'ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/add-treatment-center/', {
      template: htmlTemplate,
      controller: 'AddListingCtrl'
    });
  }])
  .factory('AddlistService', service) //.factory('AddlistDirectivee', directive)

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


  .controller('AddListingCtrl', ctrl);

module.exports = moduleName;
