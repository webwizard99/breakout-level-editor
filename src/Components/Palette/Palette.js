import React from 'react';
import { connect } from 'react-redux';
import { CHANGE_PALETTE_INDEX,
  CHANGE_COLOR, 
  SET_PALETTE} from '../../actions/types';
import PaletteBlock from '../PaletteBlock/PaletteBlock';
import './Palette.css';
import Constants from '../../Game/breakout/resources/js/utils/Constants.js';
import BlockManager from '../../Utils/BlockManager';
import InputController from '../../Utils/InputController';


const sizeFactor = 1.1;

class Palette extends React.Component {
  constructor(props) {
    super(props);

    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.getPaletteBlocks = this.getPaletteBlocks.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id < 0 & this.props.id > 0) {
      BlockManager.retrieveRecords();
      BlockManager.retrievePalette(this.props.id);
      
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

  handleKeyDown(e) {
    const isPaused = InputController.getKeyBreak();
    if (isPaused) return;
    if (document.activeElement === document.querySelector('.Title-text')) {
      return;
    }
    const direction = InputController.getDirectionInput();
    const index = this.props.paletteIndex;
    if (direction.up) {
      if (index > 3) {
        this.props.changePaletteIndex(index - 4);
        const tBlocks = BlockManager.getPalette();
        this.props.changeColor(tBlocks[index - 4].color);
      }
    }
    if (direction.right) {
      if (index < Constants.getPaletteBlocks() -1) {
        this.props.changePaletteIndex(index + 1);
        const tBlocks = BlockManager.getPalette();
        this.props.changeColor(tBlocks[index + 1].color);
      }
    }
    if (direction.down) {
      if (index < Constants.getPaletteBlocks() -4) {
        this.props.changePaletteIndex(index + 4);
        const tBlocks = BlockManager.getPalette();
        this.props.changeColor(tBlocks[index + 4].color);
      }
    }
    if (direction.left) {
      if (index > 0) {
        this.props.changePaletteIndex(index -1);
        const tBlocks = BlockManager.getPalette();
        this.props.changeColor(tBlocks[index - 1].color);
      }
    }
  }

  getPaletteBlocks() {
    const numberOfBlocks = Constants.getPaletteBlocks();

    let paletteBlocksT = this.props.paletteBlocks;

    return (
      paletteBlocksT.map((block, n) => {
        return <PaletteBlock color={block.color}
          type={block.type}
          key={n}
          blockNumber={n}
          paletteIndex={this.props.paletteIndex}
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
      <div className="PaletteContainer"
        onScroll={this.handleKeyDown}>
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
    id: state.levelList.id,
    paletteIndex: state.palette.currentIndex
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