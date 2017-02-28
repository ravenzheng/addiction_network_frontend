var angular = require('angular'),
  htmlTemplate = require('./sidePanel.html'),
  originalDateset = require('./slug.json'),
  urlPrefix = 'http://www.addictionnetwork.com',
  moduleName = 'app.sidePanel';

function SidePanelCtrl($scope, $element, $attrs) {
  var type = $attrs.type;
  var arr = originalDateset[type];
  this.type = type;
  this.listings = arr.map(function (elem) {
    var slug = elem.toLowerCase();
    slug = slug.replace(/ |\//g, '_');
    return {
      link: urlPrefix + '/sponsorhome?slug=' + slug,
      name: elem
    };
  });
}

angular.module(moduleName, []).component('sidePanel', {
  template: htmlTemplate,
  controller: 'SidePanelCtrl'
}).controller('SidePanelCtrl', SidePanelCtrl);

module.exports = moduleName;
