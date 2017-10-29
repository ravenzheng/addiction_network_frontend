var express = require('express');
var connect_s4a = require('connect-s4a');
var app = express();

app.use(connect_s4a("9b86e9430a14b8bab3a4cac92bc22520"));

// app.get('/', function (request, response) {
//   response.send('Was not a robot and we are here inside app');
// });

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/build'));
// app.use(require('prerender-node'));

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
