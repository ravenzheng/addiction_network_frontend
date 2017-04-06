module.exports = ['$log', 'AdvertisementService', '$rootScope', '$document', ctrl];

function ctrl($log, service, $rootScope, $document) {
  $rootScope.$on('$stateChangeSuccess',
    function () {
      service.queryGlobalAds().then(function (result) {
        var header = angular.element($document[0].querySelector('#header_ad'));
        var footer = angular.element($document[0].querySelector('#footer_ad'));
        var sidebar = angular.element($document[0].querySelector('#sidebar_ad'));
        header.attr('src', result.advertisements.header);
        footer.attr('src', result.advertisements.footer);
        sidebar.attr('src', result.advertisements.side_bar);
      }).catch(function (err) {
        // todo, display the error message in the page.
        $log.error(err);
      });
    });
}
