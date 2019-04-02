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
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    this.props.changePaletteIndex(this.props.blockNumber);
    const rgbaColor = this.props.color.replace(')', ", 1)");
    this.props.changeColor(rgbaColor);
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

        if (this.props.type === 'healer') {
          CanvasTools.drawRectOutline(blockCTX, 'green', 2,
          startX,
          startY,
          Constants.getBlockProto().height,
          Constants.getBlockProto().width);
        }

        if (this.props.type === 'strong') {
          CanvasTools.drawRectOutline(blockCTX, 'rgba(140,140,140,1)', 2,
          startX,
          startY,
          Constants.getBlockProto().height,
          Constants.getBlockProto().width);
        }

  }

  
  render() {
    const activeClass = `${this.props.paletteIndex === this.props.blockNumber ? 'PaletteBlock-active' : ''}`;
    return (
      <div className="PaletteBlockContainer">
        <canvas className={`PaletteBlock PaletteBlock-${this.props.blockNumber} ${activeClass}`} 
          width={Constants.getCell().width}
          height={Constants.getCell().height}
          onClick={this.handleClick}
          color={this.props.color}
        >
        </canvas>
      </div>
    )
  }
}


export default PaletteBlock;