var socketIo = (function(){

  var socket = io();
  var isConnected = false;

  function sendRobotMove(pos){
    socket.emit('move', pos);
  }

  socket.on('isConnected', function(isConnected){
    var sl = domElements.statusLight;
    var st = domElements.statusText;
    var cz = domElements.controlZone;
    isConnected = isConnected;

    if(isConnected) {
      sl.classList.add('status-light-connected');
      st.innerHTML = "connected";
      cz.style.background = "#35d665";
    } else {
      sl.classList.remove('status-light-connected'); 
      st.innerHTML = "not connected";
      cz.style.background = "#EB5757";
    }
  });

  return {
    sendRobotMove,
    isConnected
  }

}());