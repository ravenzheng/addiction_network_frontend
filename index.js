var express = require('express'),
  app = express();

app.set('port', (process.env.PORT || 3019));
app.use(express.static(__dirname + '/build'));

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
