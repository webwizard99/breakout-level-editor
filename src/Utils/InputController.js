const InputController = (function(){
  let dialogInputs = {
    yes: false,
    no: false
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
    }
  }
}());

export default InputController;