import { INITIALIZE_LEVEL_LIST } from '../actions/types';

const initialState = {
  id: -1,
  name: 'levelList',
  levels: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case INITIALIZE_LEVEL_LIST:
      return {
        ...state
      }
    default:
      return state;
  }
}