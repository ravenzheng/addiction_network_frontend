function PaginationCtrl() {
  var vm = this;
  vm.order = 'ASC';
  vm.range = range;
  vm.previous = gotoPrevious;
  vm.next = gotoNext;

  function range(number) {
    var arr = [];
    for (var i = 0; i < number; i++) {
      arr.push(i + 1);
    }
    return arr;
  }

  function gotoPrevious() {
    if (vm.currentPage > 1) {
      vm.currentPage--;
    }
  }

  function gotoNext() {
    if (vm.currentPage < vm.totalPage) {
      vm.currentPage++;
    }
  }
}

module.exports = {
  template: require('./view.html'),
  controller: PaginationCtrl,
  bindings: {
    pageSize: '<',
    totalPage: '<',
    currentPage: '='
  }
};
