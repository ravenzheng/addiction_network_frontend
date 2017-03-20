function ctrl($routeParams, service) {
  var vm = this;
  var id = $routeParams.id;
  service.queryById(id).then(function (result) {
    result.address = result.address_line_1 + result.address_line_2;
    vm.entry = result;
  }).catch(function (err) {
    console.log(err);
  });
}

module.exports = ['$routeParams', 'TreatmentcenterDetailService', ctrl];
