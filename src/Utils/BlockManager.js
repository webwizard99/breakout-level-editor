import Constants from '../Game/breakout/resources/js/utils/Constants.js';

const BlockManager = (function(){
  let name = 'default';

  const defaultBlock = {
    type: 'basic',
    color: `rgba(80, 100, 140)`,
    hp: 5
  }

  let blocks = [];

  const generateBlankPalette = function() {
    blocks.length = 0;

    const blockCount = Constants.getPaletteBlocks();

    for (let blockN = 0; blockN < blockCount; blockN++) {
        blocks.push(defaultBlock);
    }
  }

  return {
    initPalette: function(firstBlock) {
        blocks = [];
        if (blocks.length !== 0) {
            return false;
        }
        generateBlankPalette();
        blocks[0] = JSON.parse(JSON.stringify(firstBlock));
    },

    getPalette: function() {
        return blocks;
    },

    setPalette: function(newPalette) {
        blocks = JSON.parse(JSON.stringify(newPalette));
    }

    
  }
}());

export default BlockManager;