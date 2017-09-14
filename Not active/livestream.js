
var arDrone = require('ar-drone');
var http    = require('http');

var video = arDrone.createClient().getVideoStream();

video.on('data', console.log);
video.on('error', console.log);


var server = http.createServer(function(req, res) {

var client = arDrone.createClient();
});
server.listen(8080, function() {
  console.log('Streaming on port 8080 ...');
});
