import { CHANGE_PALETTE_BLOCK, CHANGE_PALETTE_INDEX } from '../actions/types';
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
    case CHANGE_PALETTE_BLOCK:
      const newBlocks = JSON.parse(JSON.stringify(state.blocks))
      const blockToChange = JSON.parse(JSON.stringify(action.block));
      newBlocks[state.currentIndex] = blockToChange;
      return {
        ...state,
        blocks: newBlocks
      }
    
    case CHANGE_PALETTE_INDEX:
      // const saveBlock = JSON.parse(JSON.stringify(state.blocks));
      return {
        ...state,
        currentIndex: action.index
      }
    default:
      return state;
  }
}