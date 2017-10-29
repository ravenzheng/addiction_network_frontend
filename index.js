var express = require('express'),
  app = express();

app.use(require('prerender-node'));
app.use(require('prerender-node').set('prerenderToken', 'iza1QCOe9dkwSczOjldR'));
app.set('port', (process.env.PORT || 3001));
app.use(express.static(__dirname + '/build'));
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
