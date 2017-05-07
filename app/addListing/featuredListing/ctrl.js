module.exports = ['$rootScope', '$element', ctrl];

function ctrl(rootScope, $element) {
  rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
    var forward = toState.name > fromState.name;
    console.log(forward);
    console.log($element);
    if (forward) {
      $element.removeClass('backward');
    } else {
      $element.addClass('backward');
    }
  });
}