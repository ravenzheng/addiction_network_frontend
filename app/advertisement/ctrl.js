module.exports = ['$log', 'AdvertisementService', ctrl];

function ctrl($log, service) {
  service.queryGlobalAds().then(function (result) {
    var header = angular.element(document.querySelector('#header_ad'));
    var footer = angular.element(document.querySelector('#footer_ad'));
    var sidebar = angular.element(document.querySelector('#sidebar_ad'));
    header.attr('src', result.advertisements.header);
    footer.attr('src', result.advertisements.footer);
    sidebar.attr('src', result.advertisements.side_bar);
  }).catch(function (err) {
    // todo, display the error message in the page.
    $log.error(err);
  });
}
