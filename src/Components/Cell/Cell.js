import React from 'react';
import './Cell.css';
import Constants from '../../Game/breakout/resources/js/utils/Constants';
import CanvasTools from '../../Utils/CanvasTools';

class Cell extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
        this.drawBlock = this.drawBlock.bind(this);
    }
    
    //*//*//*//*//*//*//*//*//
    //*//*//*//*//*//*//*//*//
    // lifecycle methods

    componentDidMount() {
        this.drawBlock();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(this.props.block) === JSON.stringify(nextProps.block)) {
            return false;
        } else {
            return true;
        }
    }

    componentDidUpdate(prevProps, prevState) {    
        this.drawBlock();
    }

    //////////////////////////
    //*//*//*//*//*//*//*//*//
    //*//*//*//*//*//*//*//*//

    drawBlock() {
        
        const blockCanvas = document.querySelector(`.cell-${this.props.row}-${this.props.col}`);
        const blockCTX = blockCanvas.getContext('2d');
        

        if (!this.props.block) {
            blockCTX.clearRect(0,0, blockCanvas.width, blockCanvas.height);
            return;
        }
        const startX = ((Constants.getCell().width) - (Constants.getBlockProto().width)) / 2;
        const startY = ((Constants.getCell().height) - (Constants.getBlockProto().height)) / 2;
        blockCTX.clearRect(0,0, blockCanvas.width, blockCanvas.height);

        CanvasTools.drawRect(blockCTX, 
            this.props.block.color,
            startX,
            startY,
            Constants.getBlockProto().height,
            Constants.getBlockProto().width);

        if (this.props.block.type === 'healer') {
          CanvasTools.drawRectOutline(blockCTX, 'green', 2,
          startX,
          startY,
          Constants.getBlockProto().height,
          Constants.getBlockProto().width);
        }

        if (this.props.block.type === 'strong') {
          CanvasTools.drawRectOutline(blockCTX, 'rgba(140,140,140,1)', 2,
          startX,
          startY,
          Constants.getBlockProto().height,
          Constants.getBlockProto().width);
        }

    }


    handleClick(e) {
        if (e.buttons === 1 || e.type === 'mouseDown') {
            if (!Constants.checkBounds(this.props.row, this.props.col)) {
                return;
            }

            console.log(e);

            if (e.shiftKey) {
              // set current block to block in cell
              if (this.props.block) {
                this.props.eyedrop(
                  this.props.block);
              }
              return;
            }

            if (this.props.block !== this.props.currentBlock || !e.altKey) {
                
              this.props.setBlock(!e.altKey ? this.props.canvasBlock : false, 
                  { y: this.props.row,
                    x: this.props.col });
            }
        }
    }

    render() {
        return (
            <canvas 
            className={`Cell cell-${this.props.row}-${this.props.col}`}
            row={this.props.row}
            col={this.props.col}
            width={Constants.getCell().width} 
            height={Constants.getCell().height}
            onMouseOver={this.handleClick}
            onMouseDown={this.handleClick}
            />

            
        );
    }
};

export default Cell;