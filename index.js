var express = require('express');
var snapsearch = require('snapsearch-client-nodejs');
var app = express();

//by default the it will only intercept and return a response with only status, header location, and html body
app.use(snapsearch.connect(
  new snapsearch.Interceptor(
    new snapsearch.Client('ENTER YOUR EMAIL', 'ENTER YOUR KEY', {}, function (error, debugging) {
      //mandatory custom exception handler for Client errors such as HTTP errors or validation errors from the API
      console.log(error);
      // error is a SnapSearchException containing a message and errorDetails which can acquired from `getMessage()` `getErrors()`
      console.log(debugging);
      // debugging is an object containing these: {apiUrl, apiKey, apiEmail, requestParameters}
      // if an exception happens, the middleware is a no-op and passes through to the next stage of your application
    }),
    new snapsearch.Detector()
  )
));

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/build'));
// app.use(require('prerender-node'));

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
