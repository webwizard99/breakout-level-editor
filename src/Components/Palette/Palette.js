import React from 'react';
import { connect } from 'react-redux';
import { SAVE_PALETTE } from '../../actions/types';
import PaletteBlock from '../PaletteBlock/PaletteBlock';
import './Palette.css';
import Constants from '../../Game/breakout/resources/js/utils/Constants.js';

const sizeFactor = 1.1;

class Palette extends React.Component {
  constructor(props) {
    super(props);

    this.getPaletteBlocks = this.getPaletteBlocks.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.props.savePalette(this.props.title);
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
    title: state.title.title
  }
}

const mapDispatchToProps = dispatch => {
  return {
    savePalette: (title) => dispatch({ type: SAVE_PALETTE, title: title })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Palette);