module.exports = ['$attrs', 'UIState', ctrl];

var originalDateset = require('./slug.json');

function ctrl($attrs, UIState) {
  var vm = this;
  vm.$onInit = onInit;

  function onInit() {
    // failed at using bindings because there is a space in the type attribute.
    var type = $attrs.type;
    vm.filter = type;
    var arr = originalDateset[type];
    vm.listings = arr.map(function (value) {
      var name = value.split('|');
      return {
        name: name[0],
        uiSref: UIState.SPONSOR_HOME.FILTER + '({filterName:"' + name[1] + '"})'
      };
    });
  }
}
