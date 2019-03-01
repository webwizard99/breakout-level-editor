import { CHANGE_TITLE } from '../actions/types';

const initialState = {
  title: ''
};

export default function(state = initialState, action) {

  switch (action.type) {
    case CHANGE_TITLE:
      return {
        ...state,
        title: action.title
      }
    default:
      return state;
  }

}