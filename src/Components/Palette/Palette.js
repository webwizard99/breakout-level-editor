import React from 'react';
import { connect } from 'react-redux';
import { CHANGE_PALETTE_INDEX,
  CHANGE_COLOR, 
  SET_PALETTE} from '../../actions/types';
import PaletteBlock from '../PaletteBlock/PaletteBlock';
import './Palette.css';
import Constants from '../../Game/breakout/resources/js/utils/Constants.js';
import BlockManager from '../../Utils/BlockManager';
import blockMapReducer from '../../reducers/blockMapReducer';

const sizeFactor = 1.1;

class Palette extends React.Component {
  constructor(props) {
    super(props);

    this.getPaletteBlocks = this.getPaletteBlocks.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id < 0 & this.props.id > 0) {
      BlockManager.retrieveRecords();
      BlockManager.retrievePalette(this.props.id);
      
      console.log(BlockManager.getPalette());
      if (BlockManager.getPalette().length < 1) {
        BlockManager.initPalette();
      };
      const tempPalette = BlockManager.getPalette();
      this.props.setPalette(tempPalette);
    }

    if (this.props.paletteBlocks !== prevProps.paletteBlocks & this.props.paletteBlocks.length > 0) {
      BlockManager.setPalette(this.props.paletteBlocks);
      BlockManager.savePalette(this.props.id);
    }

  }

  getPaletteBlocks() {
    const numberOfBlocks = Constants.getPaletteBlocks();

    let paletteBlocksT = this.props.paletteBlocks;

    return (
      paletteBlocksT.map((block, n) => {
        return <PaletteBlock color={block.color}
          key={n}
          blockNumber={n}
          changePaletteIndex={this.props.changePaletteIndex}
          changeColor={this.props.changeColor}
          width={Constants.getCell().width * sizeFactor}
          height={Constants.getCell().height}
          />
      })
    )
  }
  
  render() {
    return (
      <div className="PaletteContainer">
        <div className="Palette"
          width={Constants.getCell().width * 4}
          height={Constants.getCell().height * 4}
        >
        {this.getPaletteBlocks()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    paletteBlocks: state.palette.blocks,
    title: state.title.title,
    id: state.levelList.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changePaletteIndex: (index) => dispatch({ type: CHANGE_PALETTE_INDEX, index: index }),
    changeColor: (color) => dispatch({ type: CHANGE_COLOR, color: color }),
    setPalette: (palette) => dispatch({ type: SET_PALETTE, palette: palette })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Palette);