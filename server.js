var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var Gpio = require('pigpio').Gpio,
    lf = new Gpio(26, {mode: Gpio.OUTPUT}),
    lb = new Gpio(19, {mode: Gpio.OUTPUT}),
    rf = new Gpio(21, {mode: Gpio.OUTPUT}),
    rb = new Gpio(20, {mode: Gpio.OUTPUT});

var port = 80;
var connectedUser = null;

lf.digitalWrite(0);
lb.digitalWrite(0);
rf.digitalWrite(0);
rb.digitalWrite(0);

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

io.on('connection', function(socket){

  if(connectedUser === null){
    connectedUser = socket.id;
    io.emit('isConnected', true);
  } else {
    io.emit('isConnected', false);
  }

  socket.on('disconnect', function(){
    connectedUser = null;
    io.emit('isConnected', false);
  });

});

http.listen(port, function(){
  console.log('listening on port ' + port);
});