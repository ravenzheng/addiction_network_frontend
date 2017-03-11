function FeaturedTreatmentCenterCtrl($scope) {
  // todo
}

FeaturedTreatmentCenterCtrl.$inject = ['$scope'];

module.exports = {
  template: require('./view.html'),
  controller: FeaturedTreatmentCenterCtrl,
  bindings: {
    listings: '<'
  }
};
