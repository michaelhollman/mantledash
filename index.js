var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http  = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/static'));

app.get('/', function(request, response) {
  fs.readFile('index.html', encoding='utf8', function (err, data) {
    if (err) {
      response.status(500).send(err);
    } else {
      response.send(data);
    }
  });
});

var lastSplodyBoom = new Date();

var splodyBoom = function() {
  io.emit('bomb');
  console.log("Somebody set us up the bomb!");
};

var leedleBoom = function() {
  io.emit('leedle');
  console.log("THIS IS PATRICK!");
};

var randoSplodyBoom = function() {
  splodyBoom();
  lastSplodyBoom = new Date();
  var min = 7 * 60000; // minutes * millis per minute
  var max = 20 * 60000;
  var time = Math.floor(Math.random() * (max - min + 1) + min);
  setTimeout(randoSplodyBoom, time);
}

var randoLeedleBoom = function() {
  leedleBoom();
  var min = 7 * 60000; // minutes * millis per minute
  var max = 20 * 60000;
  var time = Math.floor(Math.random() * (max - min + 1) + min);
  setTimeout(randoLeedleBoom, time);
}

var connectedUsers = {};
io.on('connection', function(socket){
    console.log('A user connected');
    var socketId = socket.id;
    connectedUsers[socketId] = "md";
    io.emit('server', "New user connected (" + socketId + ").");
    socket.on('alert', function(msg){
      io.emit('alert', msg);
    });
    socket.on('gif', function(msg){
      io.emit('gif', msg);
    });
    socket.on('chat', function(msg){
      io.emit('chat', msg);
    });
    socket.on('user', function(msg){
      var oldName = "md";
      if(socketId in connectedUsers) {
        oldName = connectedUsers[socketId];
      }
      connectedUsers[socketId] = msg['name'];
      io.emit('server', "\"" + oldName + "\" (" + socketId + ") changed name to \"" + msg['name'] + "\".");
    });
    socket.on('userList', function(msg){
      socket.emit('userList', connectedUsers);
    });
    socket.on('disconnect', function() {
      if(socketId in connectedUsers) {
        io.emit('server', "User \"" + connectedUsers[socketId] + "\" (" + socketId + ") disconnected.");
        delete connectedUsers[socketId];
      }
      console.log("A user disconnected.");
    });
    socket.on('bomb', function() {
      splodyBoom();
    });
    socket.on('leedle', function() {
      leedleBoom();
    });
    socket.on('reload', function() {
      io.emit('reload');
      console.log("Triggering client reload");
    });
    socket.on('timeSinceLastBomb', function() {
      var diff = (new Date()) - lastSplodyBoom;
      var hours = Math.floor(diff/(1000 * 60 * 60));
      var minutes = Math.floor(diff/(1000 * 60)) - (hours * 60);
      var seconds = Math.floor(diff/(1000)) - (minutes * 60) - (hours * 3600);
      socket.emit('timeSinceLastBomb', String(hours) + ":" + String(minutes) + ":" + String(seconds) + " since last bomb.");
    })
});

var server = app.listen(app.get('port'), function() {
  console.log('Node app is running at localhost:' + app.get('port'));
  randoSplodyBoom();
  randoLeedleBoom();
});

io.listen(server);
