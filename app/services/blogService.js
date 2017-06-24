module.exports = ['$http', service];

function service($http) {
  return {
    getBlog: getBlog,
    getBlogSingle: getBlogSingle
  };

  // homepage slider
  function getBlog() {
    return $http.get('http://www.addictionnetwork.com/blog/access_blog.php?blogs=all');
  }

  function getBlogSingle(singleBlog) {
    return $http.get('http://www.addictionnetwork.com/blog/access_blog.php?blogs=single&title=' + singleBlog);
  }
}
