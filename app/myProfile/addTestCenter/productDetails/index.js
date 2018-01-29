module.exports = {
  template: require('./view.html'),
  controller: require('./ctrl')
};
window.onbeforeunload = function () {
  return 'Are you sure you want to leave?';
};
