var Avrgirl = require('avrgirl-arduino');
var express = require('express');  
var path = require('path');
var app = express();
var expressWs = require('express-ws')(app);

var port = process.env.PORT || 7000;

var avrgirl, blink;

app.use('/assets', express.static(__dirname + '/avrgat-fe/dist/assets/'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/avrgat-fe/dist/index.html');
});

app.ws('/', function(ws, req) {

  ws.send(JSON.stringify({type: 'message', body: 'Hey! Websockets are working.'}));

  ws.on('message', function(message) {
    console.log('received: %s', message);
    blink = path.join(__dirname, 'node_modules', 'avrgirl-arduino', 'junk', 'hex', message, 'Blink.cpp.hex');
    avrgirl = new Avrgirl({board: message});
    avrgirl.flash(blink, function(err) {
      console.log(err, 'done flashing!');
      if (err) {
        err = err.message;
      }
      ws.send(JSON.stringify({type: 'report', error: err}));
    });
  });
});

app.listen(port);
