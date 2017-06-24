module.exports = ['$scope', 'BlogService', '$log',
  ctrl];

function ctrl($scope, service, $log) {
  var vm = this;
  // vm.go = function () {
  // }
  service.getBlog().then(function (result) {
    vm.result = result.data;
  }).catch(function (err) {
    $log.info(err);
  });
}
