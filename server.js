var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var gpio = require('gpio');

var port = 80;

var left = {
  forward: gpio.export(26, {ready: function(){}}),
  backward: gpio.export(19, {ready: function(){}})
}

var right = {
  forward: gpio.export(21, {ready: function(){}}),
  backward: gpio.export(20, {ready: function(){ forward(); }}) 
}

function forward(){
  left.forward.set();
  right.forward.set();
  setTimeout(function(){
    stop();
  }, 4000);
}

function stop(){
  left.forward.reset();
  left.backward.reset();
  right.forward.reset();
  right.backward.reset();
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