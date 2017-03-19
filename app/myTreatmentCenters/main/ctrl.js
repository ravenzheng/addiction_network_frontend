function ctrl(service) {
  var vm = this;
  vm.centers = [];
  vm.currentCenters = [];
  vm.pageSize = 10;
  vm.totalPage = "0";
  vm.currentPage = 1;
  vm.order = 'ASC'; // ASC or DESC;
  vm.onPageUpdate = function (page) {
    vm.currentPage = page;
    vm.currentCenters = calCurrentCenters(vm.currentPage, vm.pageSize);
  }

  init();

  function init() {
    service.query().then(function (result) {
      var centers = result.treatment_centers;
      vm.centers = centers.map(function (center) {
        center.viewLink = '#/treatment_center/' + center.id;
        center.editLink = '#/edit-treatment-center/' + center.id;
        center.deleteLink = '#/my-treatment-centers/' + center.id;
        center.activateLink = '#/my-treatment-centers?post_id';
        return center;
      });
      vm.totalPage = Math.ceil(centers.length / vm.pageSize);
      vm.currentCenters = calCurrentCenters(vm.currentPage, vm.pageSize);
    });
  }

  // page number start from 1
  function calCurrentCenters(currentPage, pageSize) {
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = startIndex + pageSize;
    return vm.centers.slice(startIndex, endIndex);
  }
}

module.exports = ['MyTreatmentCentersService', ctrl];



// edit link
// http://www.addictionnetwork.com/add-treatment-center/?slug=_143
//
// delete link
// http://www.addictionnetwork.com/my-treatment-center/?slug=_143

// activateLink
// http://www.addictionnetwork.com/my-treatment-center?post_id=46739&amp;addiction_treatment_activation=0
