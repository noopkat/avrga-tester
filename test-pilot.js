var testpilot = require('./index');
var Avrgirl = require('avrgirl-arduino');
var fs = require('fs');
var path = require('path');

var avrgav;

fs.readFile(path.join(__dirname, 'node_modules', 'avrgirl-arduino', 'package.json'), function (err, data) {
  var pjson = JSON.parse(data);
  avrgav = pjson.version;
  var hexpath = path.join(__dirname, 'node_modules', 'avrgirl-arduino', 'junk', 'hex');
  testpilot(Avrgirl, avrgav, hexpath);
});

