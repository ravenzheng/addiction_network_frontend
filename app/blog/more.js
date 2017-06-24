module.exports = ['$scope', 'BlogService', '$log', '$state',
  ctrl];

function ctrl($scope, service, $log, $state) {
  var vm = this;
  var $stateParams = $state.params;
  vm.paged = $stateParams.next;
  service.getBlogPaged(vm.paged).then(function (result) {
    vm.result = result.data;
    if (vm.paged === '1') {
      var arr = [];
    } else {
      arr = [1];
    }
    //  vm.more = [1, 2, 3, 4, 5];
    // if (vm.paged >= vm.result[0].published_post) {
    //   vm.paged = vm.result[0].published_post - 3;
    // }
    if (+vm.paged + 3 >= vm.result[0].published_post) {
      for (var i = vm.paged; i <= vm.result[0].published_post; i++) {
        arr.push(i);
      }
    } else {
      for (i = vm.paged; i <= +vm.paged + 2; i++) {
        arr.push(i);
      }
    }
    vm.next = +vm.paged + 1;
    vm.more = arr;
  }).catch(function (err) {
    $log.info(err);
  });
}
