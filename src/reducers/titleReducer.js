import { CHANGE_TITLE } from '../actions/types';

const initialState = {
  title: '', 
  hasChanges: false
};

export default function(state = initialState, action) {

  switch (action.type) {
    case CHANGE_TITLE:
      return {
        ...state,
        title: action.title,
        hasChanges: true
      }
    default:
      return state;
  }

}