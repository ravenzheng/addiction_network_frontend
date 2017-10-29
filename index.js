var express = require('express');
var snapsearch = require('snapsearch-client-nodejs');
var app = express();

//by default the it will only intercept and return a response with only status, header location, and html body
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
  )
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
