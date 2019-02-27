import { CHANGE_TITLE } from './types';

export const titleDispatch = () => dispatch => {
  return {
    changeTitle: (title) => dispatch({type: CHANGE_TITLE, title: title})
  }
}