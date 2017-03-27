function ctrl(service) {
  var vm = this;
  vm.centers = [];
  vm.currentCenters = [];
  vm.pageSize = 10;
  vm.totalPage = 0;
  vm.currentPage = 1;
  vm.order = 'ASC'; // ASC or DESC;
  vm.onPageUpdate = onPageUpdate;
  vm.onActivate = onActivate;
  vm.onDelete = onDelete;

  init();

  // get center list from server
  function init() {
    service.queryList().then(function (result) {
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

  // when current page is changed, update currentCenters accordingly
  function onPageUpdate(page) {
    vm.currentPage = page;
    vm.currentCenters = calCurrentCenters(vm.currentPage, vm.pageSize);
  }

  // activate of deactivate a treatment center by id
  function onActivate(id) {
    service.activate(id).then(function (result) {
      var index = _findCenterById(id);
      if (index !== -1) {
        var center = vm.centers[index];
        center.active = result.active;
        var seg = center.active ? 'activated' : 'deactivated';
        vm.prompt = center.center_name + 'is ' + seg + ' successfully';
      }
    }).catch(function (error) {
      vm.prompt = error;
    });
  }

  // delete a treatment center by id
  function onDelete(id) {
    service.remove(id).then(function ( /* result */ ) {
      var index = _findCenterById(id);
      if (index !== -1) {
        var center = vm.centers[index];
        vm.centers.splice(index, 1);
        vm.prompt = center.center_name + 'is deleted successfully';
        // in case the last ones in last page are deletes.
        // e.g.
        // current: vm.centers.length = 51, the total page is 6.
        // after one center is removed :
        // the total is 50 and the total page is 5.
        var _totalPage = Math.ceil(vm.centers.length / vm.pageSize);
        if (_totalPage < vm.totalPage) {
          vm.totalPage = _totalPage;
        }
        if (vm.currentPage > vm.totalPage) {
          vm.currentPage = vm.totalPage;
        }
      }
      vm.currentCenters = calCurrentCenters(vm.currentPage, vm.pageSize);
    }).catch(function (error) {
      vm.prompt = error;
    });
  }

  // return the index of the desired center in the centers array
  function _findCenterById(id) {
    var len = vm.centers.length;
    for (var i = 0; i < len; i++) {
      var center = vm.centers[i];
      if (center.id === id) {
        return i;
      }
    }
    return -1;
  }
}

module.exports = ['TreatmentCenterService', ctrl];
