(function(){

  var controlZone = {};

  window.addEventListener('resize', init);
  window.addEventListener('load', init);
  document.addEventListener('mouseup', stopDragCursor);
  document.addEventListener('touchend', stopDragCursor);

  function init(){
    var cz = domElements.controlZone;
    controlZone = {
      width: cz.offsetWidth,
      height: cz.offsetHeight,
      top: cz.getBoundingClientRect().top,
      left: cz.getBoundingClientRect().left
    };
    controlZone.center = [controlZone.left + controlZone.width / 2, controlZone.top + controlZone.height / 2];
    controlZone.radius = controlZone.width / 2;
  };

  domElements.controlCursor.addEventListener('mousedown', function(e){
    e.preventDefault();
    document.onmousemove = dragCursor;
  });

  domElements.controlCursor.addEventListener('touchstart', function(e){
    e.preventDefault();
    document.ontouchmove = dragCursor;
  });

  function dragCursor(e){
    if(!e.x){
      e.x = e.touches["0"].clientX;
      e.y = e.touches["0"].clientY;
    }
    var jc = domElements.controlCursor;
    var result = limit(e.x, e.y);
    jc.style.left = result.x - jc.offsetWidth/2 + "px";
    jc.style.top = result.y - jc.offsetHeight/2 + "px";
    robotMove(computeMove({x: result.x, y: result.y}));
    jc.style.position = "fixed";
  }

  function stopDragCursor(){
    robotMove({forward: true, left: 0, right: 0});
    domElements.controlCursor.removeAttribute("style");
    document.onmouseup = null;
    document.ontouchend = null;
    document.onmousemove = null;
    document.ontouchmove = null;
  }

  function limit(x, y) {
    var dist = distance([x, y], controlZone.center);
    if (dist <= controlZone.radius) {
      return {x: x, y: y};
    } else {
      x = x - controlZone.center[0];
      y = y - controlZone.center[1];
      var radians = Math.atan2(y, x);
      return {
        x: Math.cos(radians) * controlZone.radius + controlZone.center[0],
        y: Math.sin(radians) * controlZone.radius + controlZone.center[1]
      }
    } 
  }

  function distance(dot1, dot2) {
    var x1 = dot1[0],
        y1 = dot1[1],
        x2 = dot2[0],
        y2 = dot2[1];
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  function computeMove(pos){
    var move = {};
    var power = Math.round(((controlZone.center[1] - pos.y) / controlZone.radius) * 255);
    var direction = controlZone.center[0] - pos.x;
    var turn = Math.abs(direction) / controlZone.radius;
    move.forward = power > 0 ? true : false;
    if(direction < 0){
      move.left = Math.abs(power);
      move.right = Math.round(Math.abs((1 - turn) * power));
    } else {
      move.right = Math.abs(power);
      move.left = Math.round(Math.abs((1 - turn) * power));
    }
    return move;
  }

  function robotMove(pos){
    console.log(pos);
  }

}());