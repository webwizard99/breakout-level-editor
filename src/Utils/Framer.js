const Framer = (function(){
  const DOMStrings = {
    objectPool: 'object-pool'
  }
  
  // reset the root font size
  function resizeText() {
    var baseH = window.innerHeight;
    var baseW = window.innerWidth;
    var hyp = Math.sqrt((baseH * baseH) + (baseW * baseW))
    var root = document.querySelector('html');
    var fontFactor = (hyp / 115).toFixed(2);
    root.style.fontSize = `${fontFactor.toString()}px`;

  }

  // move frame object to target DOM container (i.e. the object pool)
  function socketFrame(target, frame) {
    target.append(frame);
  }

  // remove all translate properties from element, thus removing any object from the view that is in the object pool
  function foldEle(ele) {
    ele.style.transform = 'translate(0,0)';
    ele.style.msTransform = 'translate(0,0)';
    ele.style.webkitTransform = 'translate(0,0)';
  }

  return {
    // positions frame inside target at vPos % of free vertical space and hPos % of free horizontal space (i.e. 50/50 is centered)
    positionFrame: function(target, frame, vPos = 50, hPos = 50) {

      const viewPos = target.getBoundingClientRect();
      foldEle(frame);
      const changePos = frame.getBoundingClientRect();
      const vOffset = (changePos.top) - viewPos.top - ((viewPos.height - changePos.height)*(vPos/100));
      const hOffset = (viewPos.left - changePos.left) + ((viewPos.width - changePos.width)*(hPos/100));

      frame.style.transform = `translate(${hOffset}px, ${-vOffset}px)`;
      frame.style.msTransform = `translate(${hOffset}px, ${-vOffset}px)`;
      frame.style.webkitTransform = `translate(${hOffset}px, ${-vOffset}px)`;

    },
  

  // positions frame object inside target DOM container for use with CSS transitions. objects are not offset from the object pool in this case
    positionFrameInterior: function(target, frame, vPos = 50, hPos = 50) {

      const viewPos = target.getBoundingClientRect();
      foldEle(frame);
      const changePos = frame.getBoundingClientRect();

      const vOffset = (changePos.y) - viewPos.y - ((viewPos.height - changePos.height)*(vPos/100));
      const hOffset = (viewPos.x - changePos.x)  + ((viewPos.width - changePos.width)*(hPos/100));

      frame.style.transform = `translate(${hOffset}px, ${-vOffset}px)`;
      frame.style.msTransform = `translate(${hOffset}px, ${-vOffset}px)`;
      frame.style.webkitTransform = `translate(${hOffset}px, ${-vOffset}px)`;

    }
  }
}());

export default Framer;