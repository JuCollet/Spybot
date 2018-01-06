var socketIo = (function(){

  var socket = io();

  function sendRobotMove(pos){
    socket.emit('move', pos);
  }

  socket.on('connection', function(isConnected){
    var sl = domElements.statusLight;
    if(isConnected) {
      sl.classList.add('status-light-connected'); 
    } else {
      sl.classList.remove('status-light-connected'); 
    }
  });

  return {
    sendRobotMove
  }

}());