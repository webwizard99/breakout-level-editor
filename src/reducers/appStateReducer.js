import { SET_HAS_CHANGES } from '../actions/types';

const initialState = {
  hasChanges: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_HAS_CHANGES:
      return {
        ...state,
        hasChanges: action.hasChanges
      }
    default:
      return state;
  }
}