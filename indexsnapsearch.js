var express = require('express');
var snapsearch = require('snapsearch-client-nodejs');
var app = express();

// by default the it will only intercept and return a response with only status, header location, and html body
app.use(snapsearch.connect(
  new snapsearch.Interceptor(
    new snapsearch.Client('sanjays442@gmail.com', '7D31zWcJ320Q5GA8sq88BXoycy0vIcBvu1L65N1bqT5kINMgp8', {}, function (error, debugging) {
      //mandatory custom exception handler for Client errors such as HTTP errors or validation errors from the API
      console.log(error);
      // error is a SnapSearchException containing a message and errorDetails which can acquired from `getMessage()` `getErrors()`
      console.log(debugging);
      // debugging is an object containing these: {apiUrl, apiKey, apiEmail, requestParameters}
      // if an exception happens, the middleware is a no-op and passes through to the next stage of your application
    }),
    new snapsearch.Detector()
  ),
  function (data) {

    //optional customised response callback
    //if intercepted, this allows you to specify what kind of status, headers and html body to return
    //remember headers is in the format of [ { name: '', value: '' },... ]

    // unless you know what you're doing, the location header is most likely sufficient
    // if you are setting up gzip compression, see the heroku example https://github.com/SnapSearch/SnapSearch-Client-Node-Heroku-Demo
    var newHeaders = [];
    data.headers.forEach(function (header) {
      if (header.name.toLowerCase() === 'location') {
        newHeaders.push({
          name: header.name,
          value: header.value
        });
      }
    });

    return {
      status: data.status,
      headers: newHeaders,
      html: data.html
    };

  }
));

// app.get('/', function (request, response) {
//   response.send('Was not a robot and we are here inside app');
// });

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/build'));
// app.use(require('prerender-node'));

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
