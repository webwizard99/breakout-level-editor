import { 
  CHANGE_PALETTE_BLOCK_COLOR, 
  CHANGE_PALETTE_INDEX,
  CHANGE_PALETTE_BLOCK,
  SET_PALETTE, } from '../actions/types';
import BlockManager from '../Utils/BlockManager';

if (BlockManager.getPalette().length < 1) {
  BlockManager.initPalette();
}

const initialState = {
  currentIndex: 0,
  blocks: BlockManager.getPalette()
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PALETTE_BLOCK_COLOR:
      const newBlocks = JSON.parse(JSON.stringify(state.blocks))
      const blockToChange = JSON.parse(JSON.stringify(newBlocks[state.currentIndex]));
      blockToChange.color = action.color;
      newBlocks[state.currentIndex] = blockToChange;
      return {
        ...state,
        blocks: newBlocks
      }
    
    case CHANGE_PALETTE_INDEX:
      return {
        ...state,
        currentIndex: action.index
      }

    case CHANGE_PALETTE_BLOCK:
      let refreshedBlocks = JSON.parse(JSON.stringify(state.blocks));
      refreshedBlocks[state.currentIndex] = JSON.parse(JSON.stringify(action.block));
      return {
        ...state,
        blocks: refreshedBlocks
      }

    case SET_PALETTE:
      return {
        ...state,
        blocks: action.palette
      }
    
    default:
      return state;
  }
}