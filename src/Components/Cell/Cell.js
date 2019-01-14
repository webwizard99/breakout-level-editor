import React from 'react';
import './Cell.css';
import Constants from '../../Game/breakout/resources/js/utils/Constants';

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.drawBlock = this.drawBlock.bind(this);
    }
    
    //*//*//*//*//*//*//*//*//
    //*//*//*//*//*//*//*//*//
    // lifecycle methods

    componentDidUpdate() {
        this.drawBlock();
    }

    //////////////////////////
    //*//*//*//*//*//*//*//*//
    //*//*//*//*//*//*//*//*//

    drawBlock() {
        
        const blockCanvas = document.querySelector(`.cell-${this.props.row}-${this.props.col}`);
        const blockCTX = blockCanvas.getContext('2d');
        blockCTX.clearRect(0,0, blockCanvas.width, blockCanvas.height);

        if (!this.props.block) return;
        
        const startX = ((Constants.getCell().width) - (Constants.getBlockProto().width)) / 2;
        const startY = ((Constants.getCell().height) - (Constants.getBlockProto().height)) / 2;

        

        

        this.drawRect(blockCTX, 
            this.props.block.color,
            startX,
            startY,
            Constants.getBlockProto().height,
            Constants.getBlockProto().width);
    }

    drawRect(ctx, fill, x, y, h, w) {
        
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.closePath();
    }


    handleClick(e) {
        if (e.buttons === 1 || e.type === 'mouseDown') {
            this.props.setViewBlock(
                this.props.row,
                this.props.col);
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