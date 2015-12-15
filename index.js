var Avrgirl = require('avrgirl-arduino');
var express = require('express');  
var path = require('path');
var app = express();
var expressWs = require('express-ws')(app);
var opener = require('opener');

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
  opener('http://' + host + ':' + port);
}

function messageHandler(message, ws) {
  console.log('received: %s', message);

  var blink = path.join(__dirname, 'node_modules', 'avrgirl-arduino', 'junk', 'hex', message, 'Blink.cpp.hex');

  var avrgirl = new Avrgirl({board: message});

  avrgirl.flash(blink, function(err) {
    console.log(err, 'done flashing!');
    if (err) {
      err = err.message;
    }
    ws.send(JSON.stringify({type: 'report', error: err}));
  });
}
