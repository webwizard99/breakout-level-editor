import { combineReducers } from 'redux';
import titleReducer from './titleReducer';
import paletteReducer from './paletteReducer';
import colorReducer from './colorReducer';
import blockMapReducer from './blockMapReducer';
import appStateReducer from './appStateReducer';
import levelListReducer from './levelListReducer';

export default combineReducers({
  appState: appStateReducer,
  title: titleReducer,
  palette: paletteReducer,
  color: colorReducer,
  blockMap: blockMapReducer,
  levelList: levelListReducer
});