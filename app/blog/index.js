var moduleName = 'app.blog';

angular.module(moduleName, ['ui.router'])
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.BLOG,
      url: '/blog',
      template: require('./view.html')
    });
    $stateProvider.state({
      name: UIState.BLOGSINGLE,
      //  url: '/sponsorhome/cities/{stateName:[a-zA-Z]{2}}/{countyName}',
      url: '/blog/{single}',
      template: require('./single.html')
    });
  }]).controller('blogCtrl', require('./ctrl'))
  .controller('blogSingleCtrl', require('./single'));

module.exports = moduleName;
