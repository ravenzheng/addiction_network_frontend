var moduleName = 'app.SignUpWelcome';

angular.module(moduleName, ['ui.router'])
.component('welcomesignup', require('./welcomeSignup'))
.component('signup', {
  template: require('./view.html'),
  controller: require('./ctrl')
})
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name:UIState.SIGN_UP.INDEX,
      url:'/signup',
      abstract: true,
      template: '<signup></signup>'
    });
    $stateProvider.state({
      name: UIState.SIGN_UP.WELCOME,
      url: '/welcome',
      template: '<welcomesignup></welcomesignup>'
    });
  }]);

module.exports = moduleName;
