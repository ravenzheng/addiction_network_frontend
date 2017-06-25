module.exports = ['$scope', '$window', 'BlogService', '$log', '$state', '$sce',
  ctrl];

function ctrl($scope, $window, service, $log, $state, $sce) {
  var vm = this;
  var $stateParams = $state.params;
  vm.singleBlog = $stateParams.single;
  service.getBlogSingle(vm.singleBlog).then(function (result) {
    vm.result = result.data;
    vm.content = $sce.trustAsHtml(result.data[0].post_content);
    //  vm.html = $sce.trustAsHtml('<script>alert(testing)</script>');
  }).catch(function (err) {
    $log.info(err);
  });
  $scope.$on('$stateChangeSuccess', function () {
    if (!$window.FB) {
      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  });
}
