module.exports = ['$scope', 'BlogService', '$log',
  ctrl];

function ctrl($scope, service, $log) {
  var vm = this;
  // vm.go = function () {
  // }
  service.getBlog().then(function (result) {
    vm.result = result.data;
    var arr = [];
    //  vm.more = [1, 2, 3, 4, 5];
    for (var i = 1; i <= 4; i++) {
      arr.push(i);
    }
    vm.more = arr;
    vm.next = 2;
  }).catch(function (err) {
    $log.info(err);
  });
}
