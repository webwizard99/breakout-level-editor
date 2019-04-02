import Constants from '../Game/breakout/resources/js/utils/Constants.js';

const BlockManager = (function(){
  let name = 'default';

  const defaultBlock = {
    type: 'basic',
    color: `rgba(80, 100, 140)`,
    hp: 5
  }

  let blocks = [];

  let hasStorage = false;

  let records = [];

  const generateBlankPalette = function() {
    blocks.length = 0;

    const blockCount = Constants.getPaletteBlocks();

    for (let blockN = 0; blockN < blockCount; blockN++) {
        blocks.push(defaultBlock);
    }
  }

  const checkRecord = function(name) {
        
    if (records.length < 1) {
        return false;
    }
    let tRec = records.find(rec => { 
        return rec === name});

    if (tRec) {
        return true;
    } else {
        return false;
    }
  }

  const saveRecords = function() {
        
    localStorage.setItem('palette-records', JSON.stringify(records));
  }

  return {
    initPalette: function() {
        if (blocks.length > 0) return;
        blocks = [];
        if (blocks.length !== 0) {
            return false;
        }
        generateBlankPalette();
    },

    getPalette: function() {
      return JSON.parse(JSON.stringify(blocks));
    },

    setPalette: function(newPalette) {
        blocks = JSON.parse(JSON.stringify(newPalette));
    },

    savePalette: function(id) {
      name = `palette-${id}`;
      
      if (!checkRecord(name)) {
        records.push(name);
      }

      localStorage.setItem(name, JSON.stringify((blocks)));
      hasStorage = true;

      saveRecords();
    },

    retrievePalette: function(id) {
      if (!hasStorage) return;
      name= `palette-${id}`;
      const TPalette = JSON.parse(localStorage.getItem(name));

      if (TPalette == null || TPalette === undefined) {
        return;
      }

      blocks = TPalette;
    },

    retrieveRecords: function() {
      const tRecords = JSON.parse(localStorage.getItem('palette-records'));

      if (tRecords === null || tRecords === undefined) {
        return;
      }

      hasStorage = true;
      records = tRecords;
    },

    getHasStorage: function() {
      return hasStorage;
    }

    
  }
}());

export default BlockManager;