var express = require('express');

var app = module.exports = express();

app.configure(function () {
  // Here we require the prerender middleware that will handle requests from Search Engine crawlers
  // We set the token only if we're using the Prerender.io service
  app.use(require('prerender-node').set('prerenderToken', 'iza1QCOe9dkwSczOjldR'));
  app.use(express.static("app"));
  app.use(app.router);
});

app.listen(3000);
console.log("Go Prerender Go!");
