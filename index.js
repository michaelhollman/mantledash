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

io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('alert', function(msg){
      io.emit('alert', msg);
    });
    socket.on('chat', function(msg){
      io.emit('chat', msg);
    });
});

var server = app.listen(app.get('port'), function() {
  console.log('Node app is running at localhost:' + app.get('port'));
});

io.listen(server);