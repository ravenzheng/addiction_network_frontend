function ctrl($routeParams, MyTreatmentCentersService) {
  var vm = this;
  vm.centers = [];
  vm.currentCenters = [];
  vm.pageSize = 10;
  vm.totalPage = "0";
  vm.currentPage = parseInt($routeParams.page);
  vm.order = $routeParams.order;
  MyTreatmentCentersService.query().then(function (result) {
    var centers = result.treatment_centers;
    vm.centers = centers.map(function (center) {
      center.viewLink = '#/treatment_center/' + center.id;
      center.editLink = '#/add-treatment-center/' + center.id;
      center.deleteLink = '#/my-treatment-centers/' + center.id;
      center.activateLink = '#/my-treatment-centers?post_id';
      return center;
    });
    var startIndex = vm.currentPage * vm.pageSize;
    var endIndex = startIndex + vm.pageSize;
    vm.currentCenters = centers.slice(startIndex, endIndex);
    vm.totalPage = Math.ceil(centers.length / vm.pageSize);
    console.log(result);
    console.log(vm.totalPage, vm.pageSize, vm.currentPage);
  });
}

module.exports = ['$routeParams', 'MyTreatmentCentersService', ctrl];



// edit link
// http://www.addictionnetwork.com/add-treatment-center/?slug=_143
//
// delete link
// http://www.addictionnetwork.com/my-treatment-center/?slug=_143

// activateLink
// http://www.addictionnetwork.com/my-treatment-center?post_id=46739&amp;addiction_treatment_activation=0
