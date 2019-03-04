import { SET_HAS_CHANGES,
  ACTIVATE_DIALOG_BOX,
  DEACTIVATE_DIALOG_BOX } from '../actions/types';

const initialState = {
  hasChanges: false,
  dialogPointer: false,
  dialogEnabled: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_HAS_CHANGES:
      return {
        ...state,
        hasChanges: action.hasChanges
      }

    case ACTIVATE_DIALOG_BOX:
      return {
        ...state,
        dialogPointer: true,
        dialogEnabled: true
      }
    case DEACTIVATE_DIALOG_BOX:
      return {
        ...state,
        dialogPointer: false,
        dialogEnabled: false
      }
    default:
      return state;
  }
}