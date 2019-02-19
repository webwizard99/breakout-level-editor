import React from 'react';
import Constants from '../../Game/breakout/resources/js/utils/Constants.js';
import './PaletteBlock.css';

class PaletteBlock extends React.Component {
  render() {
    return (
      <div className="PaletteBlockContainer">
        <canvas className="PaletteBlock"
          width={Constants.getCell().width}
          height={Constants.getCell().height}
          color={this.props.color}
        >
        </canvas>
      </div>
    )
  }
}

export default PaletteBlock;