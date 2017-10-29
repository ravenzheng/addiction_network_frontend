var express = require('express'),
  app = express();
var snapsearch = require('snapsearch-client-nodejs');

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/build'));
// app.use(require('prerender-node'));

app.use(snapsearch.connect(
      new snapsearch.Interceptor(
        new snapsearch.Client('ENTER YOUR EMAIL', 'ENTER YOUR KEY', {}, function (error, debugging) {
          //mandatory custom exception handler for Client errors such as HTTP errors or validation errors from the API
          //exceptions will only be called in the event that SnapSearchClient could not contact the API or when there are validation errors
          //in production you'll just ignore these errors, but log them here, the middleware is a no-op and will just pass through, and will not halt your application
          console.log(error);
          console.log(debugging);
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
    );

    app.get('/', function (request, response) {
      response.send('Was not a robot and we are here inside app');
    }); app.listen(app.get('port'), function () {
      console.log('Node app is running on port', app.get('port'));
    });
