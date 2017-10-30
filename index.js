var express = require('express');
var connect_s4a = require('connect-s4a');
var app = express();
app.get("*", function (req, res, next) {
  console.log('S4A', '_escaped_fragment_ is present in', req.url, req.query['_escaped_fragment_'] != null);
  next();
});

app.use(connect_s4a("cab3e171563337243b0181a6377ed299"));

app.get('/', function (request, response) {
  response.send('Was not a robot and we are here inside app');
});

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/build'));
// app.use(require('prerender-node'));

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
