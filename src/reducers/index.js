import { combineReducers } from 'redux';
import titleReducer from './titleReducer';
import paletteReducer from './paletteReducer';
import colorReducer from './colorReducer';

export default combineReducers({
  title: titleReducer,
  palette: paletteReducer,
  color: colorReducer
});