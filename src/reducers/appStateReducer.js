import { SET_HAS_CHANGES,
  ACTIVATE_DIALOG_BOX,
  DEACTIVATE_DIALOG_BOX,
  SET_TITLE_FAIL,
  SET_HAS_BLOCKS,
  SET_GAME_ACTIVE } from '../actions/types';

const initialState = {
  hasChanges: false,
  hasBlocks: false,
  dialogPointer: false,
  dialogEnabled: false,
  titleFail: false,
  gameActive: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_HAS_CHANGES:
      return {
        ...state,
        hasChanges: action.value
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

    case SET_TITLE_FAIL:
      return {
        ...state,
        titleFail: action.value
      }

    case SET_HAS_BLOCKS:
      return {
        ...state,
        hasBlocks: action.value
      }

    case SET_GAME_ACTIVE:
      return {
        ...state,
        gameActive: action.value
      }
    default:
      return state;
  }
}