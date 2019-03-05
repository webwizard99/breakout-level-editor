import { SET_HIGH_SCORE } from '../actions/types';

const initialState = {
  score: 0
}

export default function(state = initialState, action) {
  switch(action.type) {

    case SET_HIGH_SCORE:
      return {
        ...state,
        score: action.score
      }
    default:
      return state;
  }
}