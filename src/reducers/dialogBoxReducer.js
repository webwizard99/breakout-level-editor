import { SET_DIALOG_TEXT,
  SET_DIALOG_RESPONDED,
  RESET_DIALOG_RESPONDED } from '../actions/types';

const initialState = {
  dialogText: '',
  responded: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DIALOG_TEXT:
      return {
        ...state,
        dialogText: action.text
      }
    case SET_DIALOG_RESPONDED:
      return {
        ...state,
        responded: true
      }
    case RESET_DIALOG_RESPONDED:
      return {
        ...state,
        responded: false
      }
    default:
      return state;
  }
}