var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var Gpio = require('pigpio').Gpio,
    lf = new Gpio(26, {mode: Gpio.OUTPUT}),
    lb = new Gpio(19, {mode: Gpio.OUTPUT}),
    lSpeed = new Gpio(13, {mode: Gpio.OUTPUT}),
    rf = new Gpio(21, {mode: Gpio.OUTPUT}),
    rb = new Gpio(20, {mode: Gpio.OUTPUT}),
    rSpeed = new Gpio(16, {mode: Gpio.OUTPUT});

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
    io.to(connectedUser).emit('isConnected', true);
    console.log(connectedUser + " is the driver");
  }

  if(socket.id === connectedUser){

    socket.on('disconnect', function(){
      io.to(connectedUser).emit('isConnected', false);
      connectedUser = null;
      console.log('driver seat is free');
    });

    socket.on('robotMove', function(move){
      console.log(move)
      if(move.stop || (move.left === 0 && move.right === 0)) {
        lf.digitalWrite(0);
        lb.digitalWrite(0);
        rf.digitalWrite(0);
        rb.digitalWrite(0);
        lSpeed.pwmWrite(0);
        rSpeed.pwmWrite(0);
        return;
      }
      if(move.forward){
        lf.digitalWrite(0);
        lb.digitalWrite(1);
        rf.digitalWrite(0);
        rb.digitalWrite(1);
      } else {
        lf.digitalWrite(1);
        lb.digitalWrite(0);
        rf.digitalWrite(1);
        rb.digitalWrite(0);
      }
      lSpeed.pwmWrite(move.left);
      rSpeed.pwmWrite(move.right);
    });
  }
});

http.listen(port, function(){
  console.log('listening on port ' + port);
});