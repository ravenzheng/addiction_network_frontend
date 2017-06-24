module.exports = ['$http', service];

function service($http) {
  return {
    getBlog: getBlog,
    getBlogSingle: getBlogSingle,
    getBlogPaged: getBlogPaged
  };

  // homepage slider
  function getBlog() {
    return $http.get('http://localhost:8888/wordpress/access_blog.php?blogs=all');
  }

  function getBlogPaged(paged) {
    return $http.get('http://localhost:8888/wordpress/access_blog.php?blogs=all&paged=' + paged);
  }

  function getBlogSingle(singleBlog) {
    return $http.get('http://localhost:8888/wordpress/access_blog.php?blogs=single&title=' + singleBlog);
  }
}
