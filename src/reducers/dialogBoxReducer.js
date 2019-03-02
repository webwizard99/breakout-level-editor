import { SET_BINARY_DIALOG_CALLBACKS } from '../actions/types';

const initialState = {
  confirmationType: '',
  yesCallback: null,
  noCallback: null
}

export default function(state = initialState, action) {
  switch (action.types) {

    default:
      return state;
  }
}