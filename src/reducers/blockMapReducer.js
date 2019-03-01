import { SET_BLOCK,
  SET_BLOCK_MAP,
  INITIALIZE_BLOCK_MAP } from '../actions/types';

const initialState = {
  blockMap: []
}

export default function(state = initialState, action) {

  switch(action.type) {
    case INITIALIZE_BLOCK_MAP:
      const newBlockMap = JSON.parse(JSON.stringify(action.blockMap));
      return {
        ...state,
        blockMap: newBlockMap
      }

    case SET_BLOCK:
      let refreshedBlockMap = JSON.parse(JSON.stringify(state.blockMap));
      const newBlock = JSON.parse(JSON.stringify(action.block));
      
      refreshedBlockMap[action.pos.y][action.pos.x] = newBlock;
      return {
        ...state,
        blockMap: refreshedBlockMap
      }
    default:
      return state;
  }
}