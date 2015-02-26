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

var connectedUsers = {};
io.on('connection', function(socket){
    console.log('A user connected');
    var socketId = socket.id;
    connectedUsers[socketId] = "md";
    io.emit('server', "New user connected with UUID \"" + socketId + "\".");
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
      io.emit('server', "\"" + oldName + "\" changed name to \"" + msg['name'] + "\" at UUID \"" + socketId + "\".");
    });
    socket.on('userList', function(msg){
      socket.emit('userList', connectedUsers);
    });
    socket.on('disconnect', function() {
      if(socketId in connectedUsers) {
        io.emit('server', "User \"" + connectedUsers[socketId] + "\" disconnected with UUID \"" + socketId + "\".");
        delete connectedUsers[socketId];
      }
      console.log("A user disconnected.");
    });
});

var server = app.listen(app.get('port'), function() {
  console.log('Node app is running at localhost:' + app.get('port'));
});

io.listen(server);