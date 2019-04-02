const CanvasTools = (function(){
  return {
    drawRect(ctx, fill, x, y, h, w) {
        
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.closePath();
    },

    drawRectOutline: function(ctx, color, width, x, y, h, w) {
      ctx.beginPath();
      
      ctx.lineWidth = width;
      ctx.strokeStyle = color;
      ctx.rect(x + (width /2),
        y + (width /2),
        w - width,
        h - width);
      ctx.stroke();
      ctx.closePath();
    }
  }
}());

export default CanvasTools;