import Constants from '../Game/breakout/resources/js/utils/Constants';
import LevelCompression from './LevelCompression';

const LevelStorage = (function(){
    let name = 'levelList';
    let id = 1;

    let records = ['levelList'];

    let highScore = 0;

    let hasStorage = true;

    const defaultRecord = { name: 'FunkyTime',
      id: 2,
      levels: `[{"id":6,"name":"Burger","map":[[false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,{"width":1,"hp":5,"density":1,"type":"basic","row":3,"col":3,"color":"rgba(128, 114, 76)"},false,{"width":1,"hp":5,"density":1,"type":"basic","row":3,"col":5,"color":"rgba(145, 131, 93)"},false,false,false,false,false,false],[false,false,false,{"width":1,"hp":5,"density":1,"type":"basic","row":4,"col":3,"color":"rgba(145, 131, 93)"},{"width":1,"hp":5,"density":1,"type":"basic","row":4,"col":4,"color":"rgba(128, 114, 76)"},{"width":1,"hp":5,"density":1,"type":"basic","row":4,"col":5,"color":"rgba(145, 131, 93)"},false,false,{"width":1,"hp":5,"density":1,"type":"strong","row":4,"col":8,"color":"rgba(219, 206, 152)"},false,false,false],[false,false,{"width":1,"hp":5,"density":1,"type":"basic","row":5,"col":2,"color":"rgb`
    }

    let levels = [];

    const maxLength = 20;

    

    const validateId = function(id) {
        let found = levels.find(lvl => {
            return lvl.id === id;
        });

        if (found) {
            return true;
        } else {
            return false;
        }
    }

    const getIndexById = function(id) {
        return levels.indexOf(getLevelById(id));
    }

    const getLevelById = function(id) {
        
        let tLvl = levels.find(lvl => {
            
            return lvl.id === id;
        });

        return tLvl;
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
        
        localStorage.setItem('records', JSON.stringify(records));
    }

    return {
        getLevels: function() {
            return JSON.parse(JSON.stringify(levels));
        },

        setLevels: function(lvls) {
            levels = lvls;
        },

        getLevelsForGame: function() {
            if (!levels || levels.length < 1) return;
            let tLevels = [];
            levels.forEach(level => {
                const tLevel = {};
                tLevel.name = level.name;
                tLevel.id = level.id;
                tLevel.map = [];
                level.map.forEach(row => {
                    let rowT =  row.map(cell => {
                        if (cell) {
                            return {
                                type: cell.type,
                                color: cell.color.replace(')', ', %alpha)'),
                                hp: cell.hp
                            }
                        } else {
                            return false;
                        }
                        
                    });
                    tLevel.map.push(rowT);
                });
                tLevels.push(tLevel);
            });
            return tLevels;
        },

        getNewId: function() {
            let newId = 0;
            if (levels.length < 1) {
                return 1;
            } else {
                for (let ind = 0; ind < maxLength; ind++) {
                    if (!validateId(ind) && newId === 0) {
                        newId = ind;
                    }
                }
                if (newId !== 0) {
                    return newId;
                } else {
                    return -1;
                }
            }
        },

        checkLevel: function(id) {
            return validateId(id);
        },

        getLevel: function(id) {
            const foundLevel = getLevelById(id);
            if (foundLevel) {
                
                return JSON.parse(JSON.stringify(foundLevel));
            } else {
                return false;
            }
        },

        setLevel: function(lvl) {
            let id = lvl.id;
            if (!validateId(id)) {
                console.log('Tried to Put level with no id!');
                return false;
            }

            let lvlIndex = getIndexById(id);
            levels[lvlIndex] = lvl;
            
            return true;
        },

        deleteLevel: function(id) {
            if (!id) return -1;
            const tLvl = getLevelById(id);
            if (!tLvl) return -1;
            const deleteIndex = levels.indexOf(tLvl);
            levels.splice(deleteIndex, 1);
            return true;
        },

        addLevel: function(lvl) {
            levels.push(lvl);
        },

        getBlankLevel: function() {
            const r = Constants.getRowsProtoEditor();
            const c = Constants.getColumnsProto();
            let tLvl = [];
            for (let row = 0; row < r; row++) {
                let tRow = [];
                for (let col = 0; col < c; col++) {
                    tRow.push(false);
                }
                tLvl.push(tRow);
            }
            
            return tLvl;
        },

        saveLevels: function() {
            
            if (!checkRecord(name)) {
                records.push(name);
                
            }

            const retrievedLevels = JSON.stringify(levels);
            localStorage.setItem(name, retrievedLevels);
            hasStorage = true;
            saveRecords();
        },

        retrieveLevels: function() {
            if (!hasStorage) return;
            const tLevels = localStorage.getItem(name);
            
            if (tLevels === null || tLevels === undefined) {
                return;
            }

            const uncompressedLevels = LevelCompression.decompressLevelText(tLevels);
            let trimmedLevels = uncompressedLevels;
            if (uncompressedLevels[0]=== `"`) {
                trimmedLevels = uncompressedLevels.substring(1, uncompressedLevels.length - 1);
            }
            levels = JSON.parse(trimmedLevels);
            
            
        },

        retrieveRecords: function() {
            if (!hasStorage) return;
            const tRecords = JSON.parse(localStorage.getItem('records'));
            
            if (tRecords === null || tRecords === undefined) {
                return;
            }
            records = tRecords;
            

        },

        getRecords: function() {
          return JSON.parse(JSON.stringify(records));
        },
        
        getListName: function() {
            return name;
        },

        setListName: function(tName) {
            name = tName;
        },

        getListId: function() {
            return id;
        },

        setListId: function(val) {
            if (val) {
                id = val;
            }
        },

        getHighScore: function() {
            return highScore;
        },

        setHighScore: function(val) {
          if (val !== false && val!== undefined) {
              highScore = val;
            }
        },

        saveHighScore: function() {
            const recName = `${name}HighScore`;
            localStorage.setItem(recName, JSON.stringify(highScore));
        },

        retrieveHighScore: function() {
            const recName = `${name}HighScore`;
            const tScore = JSON.parse(localStorage.getItem(recName));
            highScore = tScore;
        },

        swapLevels: function(id1, id2) {
          
          const index1 = getIndexById(id1);
          const lvl1 = levels.slice(index1, index1 + 1)[0];
          const index2 = getIndexById(id2);
          const lvl2 = levels.slice(index2, index2 + 1)[0];
          levels[index1] = lvl2;
          levels[index2] = lvl1;

        },

        insertLevel: function(id1, id2, direction) {
          const index1 = getIndexById(id1);
          const lvl1 = levels.splice(index1, 1)[0];
          const index2 = getIndexById(id2);
          levels.splice(index2 + direction, 0, lvl1);
        },

        getLevelForStorage: function() {
          const storeMap = this.getLevelForOutput().map;    
          let outputLevel = { 
              id: this.state.id,
              name: this.state.title,
              map: storeMap };
      
          return outputLevel;
        }
    }
}());

export default LevelStorage;