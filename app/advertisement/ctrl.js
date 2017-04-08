module.exports = ['$log', 'AdvertisementService', '$scope', '$rootScope', '$document', ctrl];

function ctrl($log, service, $scope, $rootScope, $document) {
  $scope.$on('$stateChangeSuccess',
    function () {
      service.queryGlobalAds().then(function (result) {
        var header = angular.element($document[0].querySelector('#header_ad'));
        var sidebar = angular.element($document[0].querySelector('#sidebar_ad'));
        $rootScope.$emit('AdChanged', result);
        header.attr('src', result.advertisements.header);
        sidebar.attr('src', result.advertisements.side_bar);
      }).catch(function (err) {
        // todo, display the error message in the page.
        $log.error(err);
      });
    });
}
