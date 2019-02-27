import { CHANGE_COLOR } from '../actions/types';

const initialState = {
  color: `rgba(80, 100, 140, 1)`
};

export default function(state = initialState, action) {
  switch (action.type) {

    default:
      return state;
  }
}