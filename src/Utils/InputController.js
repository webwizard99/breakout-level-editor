const InputController = (function(){
  let dialogInputs = {
    yes: false,
    no: false
  }

  let directionInput = {
    up: false,
    right: false,
    down: false,
    left: false
  }

  let keycodes = {
    w: 87,
    a: 65,
    s: 83,
    d: 68,
    up: 38,
    right: 39,
    down: 40,
    left: 37
  }

  let keyBreak = false;
  const keyPause = 600;

  const setEventListeners = function() {
    document.addEventListener('keydown', (e) => {
      handleKeypress(e);
    });
    document.addEventListener('keyup', (e) => {
      toggleKeypress(e);
    });
  }

  const handleKeypress = function(e) {
    
    if (!e.isTrusted) return;

    
    switch (e.keyCode) {
      case keycodes.w:
      case keycodes.up:
        directionInput.up = true;
        break;
      case keycodes.a: 
      case keycodes.left:
        directionInput.left = true;
        break;
      case keycodes.s:
      case keycodes.down:
        directionInput.down = true;
        break;
      case keycodes.d:
      case keycodes.right:
        directionInput.right = true;
    }

    
  }

  const toggleKeypress = function(e) {
    
    if (!e.isTrusted) return;
    switch (e.keyCode) {
      case keycodes.w:
      case keycodes.up:
        directionInput.up = false;
        break;
      case keycodes.a:
      case keycodes.left:
        directionInput.left = false;
        break;
      case keycodes.s:
      case keycodes.down:
        directionInput.down = false;
        break;
      case keycodes.d:
      case keycodes.right:
        directionInput.right = false;
    }

  }

  let textInputFocus = false;
  
  return {
    getDialogStatus: function() {
      return dialogInputs.yes || dialogInputs.no;
    },

    getDialogResponse: function() {
      return JSON.parse(JSON.stringify(dialogInputs));
    },

    setDialogYes: function(val) {
      if (val !== true && val !== false) return;
      dialogInputs.yes = val;
    },

    setDialogNo: function(val) {
      if (val !== true && val !== false) return;
      dialogInputs.no = val;
    },

    getTextInputFocus: function() {
      return textInputFocus;
    },

    setTextInputFocus: function(val) {
      if (val !== true && val !== false) return;
      textInputFocus = val;
    },

    init: function() {
      setEventListeners();
    },

    setKeyBreak: function() {
      if (keyBreak) return false;

      keyBreak = true;
      setTimeout(() => keyBreak = false, keyPause);
      return true;
    },

    getKeyBreak: function() {
      return keyBreak;
    },

    getDirectionInput: function() {
      return JSON.parse(JSON.stringify(directionInput));
    }
  }
}());

export default InputController;