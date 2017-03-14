var states = require('./states.json');

function ctrl() {
  var vm = this;
  vm.states = states;
}

module.exports = ctrl;
