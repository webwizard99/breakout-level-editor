import { CHANGE_PALETTE_BLOCK } from '../actions/types';
import BlockManager from '../Utils/BlockManager';

BlockManager.initPalette();

const initialState = {
  currentIndex: 0,
  blocks: BlockManager.getPalette()
}

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}