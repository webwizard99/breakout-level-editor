const ReactPosition = (function(){
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('dragover', function(event){
    mouseX = event.clientX;
    mouseY = event.clientY;
    
  });

  return {
    getCurrentDragPos: function() {
      return {x: mouseX, y: mouseY};
    }
  }
}());

export default ReactPosition;