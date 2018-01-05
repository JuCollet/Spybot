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

lf.digitalWrite(0);
lb.digitalWrite(0);
rf.digitalWrite(0);
rb.digitalWrite(0);

forward();

function forward(){
  lf.digitalWrite(1);
  rf.digitalWrite(1);
  setTimeout(function(){
    stop();
  }, 4000);
}

function stop(){
  lf.digitalWrite(0);
  lb.digitalWrite(0);
  rf.digitalWrite(0);
  rb.digitalWrite(0);
  setTimeout(function(){
    forward();
  }, 10000)
}

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

http.listen(port, function(){
  console.log('listening on port ' + port);
});