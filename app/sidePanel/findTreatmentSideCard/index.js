function FindTreatmentSideCardCtrl() {
  var vm = this;
  vm.onStateUpdate = function (selected) {
    vm.selectedState = selected;
  };
  vm.submit = function () {
    // send request
    // todo
    console.log(vm.selectedState);
  };
}
module.exports = {
  template: require('./view.html'),
  controller: FindTreatmentSideCardCtrl
};
