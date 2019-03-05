const Dialog = (function() {
  
  const dialogs = {
    loadLevel: 'loadLevel',
    deleteLevel: 'deleteLevel',
    deleteMap: 'deleteMap'
  }
  
  return {
    createNewDialog: function(emptyObject = {}) {
      emptyObject.loadLevel = dialogs.loadLevel;
      emptyObject.deleteLevel = dialogs.deleteLevel;
      emptyObject.deleteMap = dialogs.deleteMap;
      return emptyObject;
    }
  }
  
})();

export default Dialog;