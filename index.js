var connect_s4a = require('connect-s4a');
var token = "9b86e9430a14b8bab3a4cac92bc22520";
var express = require('express');
var app = express();
app.use(connect_s4a(token));
app.get('/', function (req, res) {
  res.send('hello world');
});
app.listen(3000);
