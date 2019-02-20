const CanvasTools = (function(){
  return {
    drawRect(ctx, fill, x, y, h, w) {
        
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.closePath();
    }
  }
}());

export default CanvasTools;