var originalDateset = require('./slug.json');

function SidePanelCtrl($attrs) {
  var type = $attrs.type;
  var arr = originalDateset[type];
  this.type = type;
  this.listings = arr.map(function (elem) {
    return {
      link: '#/sponsorhome/' + elem,
      name: elem
    };
  });
}

module.exports = ['$attrs', SidePanelCtrl];
