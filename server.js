var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');
var fs = require('fs');

var url = require('url');

var app = connect();

var serve = serveStatic('./');
app.use(serve);

// Map all the expected SPA urls to the root index.html
app.use(function (req, res, next) {
  var reqUri = url.parse(req.url);
  if (/^\/[0-9]+/.test(reqUri.pathname)) {
    fs.readFile('./index.html', { encoding: 'utf8' }, function (err, data) {
      if (err) {
        throw err;
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Content-Length', data.length);
      res.write(data, 'utf8', function (err) {
        if (err) {
          throw err;
        }
        res.end();
      });
    });
  } else {
    next();
  }
});

console.log('Starting webserver on http://localhost:8080/');
http.createServer(app).listen(8080);
