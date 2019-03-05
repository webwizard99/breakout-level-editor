import { combineReducers } from 'redux';
import titleReducer from './titleReducer';
import paletteReducer from './paletteReducer';
import colorReducer from './colorReducer';
import blockMapReducer from './blockMapReducer';
import appStateReducer from './appStateReducer';
import highScoreReducer from './highScoreReducer';
import levelListReducer from './levelListReducer';
import dialogBoxReducer from './dialogBoxReducer';

export default combineReducers({
  appState: appStateReducer,
  title: titleReducer,
  palette: paletteReducer,
  color: colorReducer,
  blockMap: blockMapReducer,
  highScore: highScoreReducer,
  levelList: levelListReducer,
  dialog: dialogBoxReducer
});