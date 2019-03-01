import React from 'react';
import Constants from '../../Game/breakout/resources/js/utils/Constants.js';
import CanvasTools from '../../Utils/CanvasTools';
import './PaletteBlock.css';

class PaletteBlock extends React.Component {
  constructor(props) {
    super(props);

    this.drawBlock = this.drawBlock.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    
  }

  //*//*//*//*//*//*//*//*//
  //*//*//*//*//*//*//*//*//
  // lifecycle methods
  //*//*//*//*//*//*//*//*//
  //*//*//*//*//*//*//*//*//
  
  componentDidMount() {
    this.drawBlock();
  }

  componentDidUpdate(prevProps, prevState) {    
    this.drawBlock();
  }

  drawBlock() {
    const blockCanvas = document.querySelector(`.PaletteBlock-${this.props.blockNumber}`);
    const blockCTX = blockCanvas.getContext('2d');

    if (!this.props.color) {
      blockCTX.clearRect(0,0, blockCanvas.width, blockCanvas.height);
      return;
    }

    const startX = ((Constants.getCell().width) - (Constants.getBlockProto().width)) / 2;
    const startY = ((Constants.getCell().height) - (Constants.getBlockProto().height)) / 2;
    blockCTX.clearRect(0,0, blockCanvas.width, blockCanvas.height);
    
    CanvasTools.drawRect(blockCTX, 
        this.props.color,
        startX,
        startY,
        Constants.getBlockProto().height,
        Constants.getBlockProto().width);

  }

  
  render() {
    return (
      <div className="PaletteBlockContainer">
        <canvas className={`PaletteBlock PaletteBlock-${this.props.blockNumber}`}
          width={Constants.getCell().width}
          height={Constants.getCell().height}
          onClick={() => this.props.changePaletteIndex(this.props.blockNumber)}
          color={this.props.color}
        >
        </canvas>
      </div>
    )
  }
}


export default PaletteBlock;