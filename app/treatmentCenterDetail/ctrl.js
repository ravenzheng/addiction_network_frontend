function ctrl($log, $stateParams, service) {
  var vm = this;
  var id = $stateParams.id;
  service.queryDetail(id).then(function (result) {
    result.address = result.address_line_1 + result.address_line_2;
    vm.entry = result;
  }).catch(function (err) {
    $log.error(err);
  });
}

module.exports = ['$log', '$stateParams', 'TreatmentCenterService', ctrl];
