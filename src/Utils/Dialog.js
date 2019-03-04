const Dialog = (function() {
  
  const dialogs = {
    loadLevel: 'loadLevel',
    deleteLevel: 'deleteLevel'
  }
  
  return {
    createNewDialog: function(emptyObject = {}) {
      emptyObject.loadLevel = dialogs.loadLevel;
      emptyObject.deleteLevel = dialogs.deleteLevel;
      return emptyObject;
    }
  }
  
})();

export default Dialog;