var entry = require('./detail.json');

function ctrl($scope, service) {
  $scope.entry = entry;
}

module.exports = ['$scope', 'TreatmentcenterDetailService', ctrl];
