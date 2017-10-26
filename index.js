var express = require('express'),
  app = express();

// app.use(require('prerender-node').set('prerenderToken', 'YOUR_TOKEN'));
// app.use(require('prerender-node').set('prerenderToken', 'x1zpxPFNI1UorWSJ1OtM'));
app.use(require('prerender-node').set('prerenderServiceUrl', 'http://localhost:4000/').set('prerenderToken', 'x1zpxPFNI1UorWSJ1OtM'));
app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/build'));

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
