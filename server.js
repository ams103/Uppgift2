
var arDrone = require('ar-drone');
var http    = require('http');
var Express = require("Express");
var BodyParser = require("Body-Parser");
var PouchDB = require("PouchDB");
var database = new PouchDB("drone_pouch");
var app = Express();
var remoteCouch = "http://127.0.0.1:5984/drone";
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

sync();
//This function syncs the couchdb with pouchdb
function sync() {
  var opts = {live: true};
  database.replicate.to(remoteCouch, opts);
  database.replicate.from(remoteCouch, opts);

}


console.log('Connecting png stream ...');

var pngStream = arDrone.createClient().getPngStream();

var lastPng;
pngStream
  .on('error', console.log)
  .on('data', function(pngBuffer) {
    lastPng = pngBuffer;
  });

var server = http.createServer(function(req, res) {
  if (!lastPng) {
    res.writeHead(503);
    res.end('Did not receive any png data yet.');
    return;
  }

  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(lastPng);
});

var client = arDrone.createClient();
/*
client.takeoff();

client
  .after(5000, function() {
    this.clockwise(0.5);
  })
  .after(3000, function() {
    this.animate('flipLeft', 15);
  })
  .after(1000, function() {
    this.stop();
    this.land();
  });
*/

//Get all documents
app.get("/drone", function(req,res) {
  database.allDocs({include_docs: true}).then(function(result) {
    res.send(result.rows.map(function(item) {
      return item.doc;
      }));
  }, function(error) {
    res.status(400).send(error);
    });
});
//Get specific document
app.get("/drone:id", function(req, res) {
  if(!req.params.id) {
    return res.status(400).send({"status": "error", "message": "An ´id´ is required"});
  }
  database.get(req.params.id).then(function(result) {
    res.send(result);
  }, function(error) {
    res.status(400).send(error);
    });
});


  db.put({
    _id: '',
    _attachments: {
      '': {
        content_type: 'image/png',
        data: ''
      }
    }
  }).then(function () {
    return db.getAttachment('', '');
  }).then(function (blob) {
    var url = URL.createObjectURL(blob);
    var img = document.createElement('img');
    img.src = url;
    document.body.appendChild(img);
  }).catch(function (err) {
    console.log(err);
  });

  server.listen(8080, function() {
    console.log('Serving latest png on port 8080 ...');
  });
