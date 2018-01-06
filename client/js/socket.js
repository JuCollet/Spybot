var socketIo = (function(){

  var socket = io();
  var isConnected = false;

  function sendRobotMove(pos){
    socket.emit('move', pos);
  }

  socket.on('isConnected', function(isConnected){
    var sl = domElements.statusLight;
    isConnected = isConnected;

    if(isConnected) {
      sl.classList.add('status-light-connected'); 
    } else {
      sl.classList.remove('status-light-connected'); 
    }
  });

  return {
    sendRobotMove,
    isConnected
  }

}());