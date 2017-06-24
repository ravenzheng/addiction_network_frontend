module.exports = ['$scope', 'BlogService', '$log', '$state', '$sce',
  ctrl];

function ctrl($scope, service, $log, $state, $sce) {
  var vm = this;
  var $stateParams = $state.params;
  vm.singleBlog = $stateParams.single;
  service.getBlogSingle(vm.singleBlog).then(function (result) {
    vm.result = result.data;
    vm.content = $sce.trustAsHtml(result.data[0].post_content);
  }).catch(function (err) {
    $log.info(err);
  });
}
