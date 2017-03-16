var states = require('./states.json');

function StateSelectctrl() {
  var vm = this;
  vm.states = states;
}

module.exports = {
  template: require('./view.html'),
  controller: StateSelectctrl,
  bindings: {
    onUpdate: '&'
  }
};
