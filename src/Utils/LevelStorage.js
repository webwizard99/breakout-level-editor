import Constants from '../Game/breakout/resources/js/utils/Constants';

const LevelStorage = (function(){
    let name = 'levelList';

    let records = ['levelList'];

    let hasStorage = true;

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
            return levels;
        },

        setLevels: function(lvls) {
            levels = lvls;
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
                
                return foundLevel;
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

        addLevel: function(lvl) {
            levels.push(lvl);
        },

        getBlankLevel: function() {
            const r = Constants.getRowsProto();
            const c = Constants.getColumnsProto();
            let tLvl = [];
            for (let row = 0; row < r; row++) {
                let tRow = [];
                for (let col = 0; col < c; col++) {
                    tRow.push(false);
                }
                tLvl.push(tRow);
            }
            console.table(tLvl);
            return tLvl;
        },

        saveLevels: function() {
            
            if (!checkRecord(name)) {
                records.push(name);
                saveRecords();
            }
            localStorage.setItem(name, JSON.stringify(levels));
            hasStorage = true;
        },

        retrieveLevels: function() {
            if (!hasStorage) return;
            levels = JSON.parse(localStorage.getItem(name));
            
        },

        retrieveRecords: function() {
            if (!hasStorage) return;
            records = JSON.parse(localStorage.getItem('records'));
        },
        
        getListName: function() {
            return name;
        },

        setListName: function(tName) {
            name = tName;
        }
    }
}());

export default LevelStorage;