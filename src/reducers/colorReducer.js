import { CHANGE_COLOR } from '../actions/types';

const initialState = {
  color: `rgba(80, 100, 140, 1)`
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COLOR:
      let colorCheck = action.color;
      const commaCount = colorCheck.match(/[\,]/g);
      if (commaCount.length === 2) {
        colorCheck = colorCheck.replace(')', ', 1)');
      }
      return {
        ...state,
        color: colorCheck
      }
    default:
      return state;
  }
}