module.exports = ['$log', ctrl];

function ctrl($log) {
  $log.info('carousel from angular-ui-bootstrap');
  var vm = this;
  vm.interval = 3000;
  vm.noWrap = false;
}
