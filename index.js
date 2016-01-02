var express = require('express');
var path = require('path');
var app = express();
var expressWs = require('express-ws')(app);
var opener = require('opener');
var os = require('os');
var fs = require('fs');

module.exports = function (Avrgirl, version, hexpath) {

  var avrgatv;
  var avrgav = version;

  var data = fs.readFileSync(path.join(__dirname, 'package.json'), {encoding: 'utf-8'});
  var pjson = JSON.parse(data);
  avrgatv = pjson.version;

  var port = process.env.PORT || 7000;

  app.use('/assets', express.static(__dirname + '/frontend/assets/'));

  app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/frontend/index.html');
  });

  app.ws('/', function(ws, req) {
    ws.send(JSON.stringify({type: 'message', body: 'Hey! Websockets are working.'}));
    ws.on('message', function(message) {
      messageHandler(message, ws);
    });
  });

  var server = app.listen(port, 'localhost', setUpApp);

  function setUpApp() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Now running AVRGA tester on http://%s:%s', host, port);
    console.log('(Press Ctrl + C to quit)');
    opener('http://' + host + ':' + port);
  }

  function messageHandler(message, ws) {

    var blink = path.join(hexpath, message, 'Blink.cpp.hex');

    var avrgirl = new Avrgirl({board: message});

    avrgirl.flash(blink, function(err) {
      if (err) {
        err = err.message;
      }

      var report = {
        type: 'report',
        error: err,
        nodev: process.version.slice(1),
        os: os.platform(),
        osv: os.release(),
        avrgatv: avrgatv,
        avrgav: avrgav,
        board: message
      }
      ws.send(JSON.stringify(report));
    });
  }
};
