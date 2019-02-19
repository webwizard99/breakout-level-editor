const BlockManager = (function(){
  let uniqueBlocks = [];
  const maxLength = 40;

  

  return {
    getNewId: function() {
      let newId = 0;
            if (uniqueBlocks.length < 1) {
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

    getUniqueBlocks: function(levelList) {
      
    }
  }
}());

export default BlockManager;