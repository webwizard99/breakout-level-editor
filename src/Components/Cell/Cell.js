import React from 'react';
import './Cell.css';
import Constants from '../../Utils/Constants';

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
    // componentDidMount() {
    //     this.drawBlock();
    // }

    componentDidUpdate() {
        this.drawBlock();
    }

    //////////////////////////
    //*//*//*//*//*//*//*//*//
    //*//*//*//*//*//*//*//*//

    drawBlock() {
        if (!this.props.block) return;
        const blockCanvas = document.querySelector(`.cell-${this.props.row}-${this.props.col}`);
        const blockCTX = blockCanvas.getContext('2d');
        const startX = ((Constants.cell.width) - (Constants.blockProto.width)) / 2;
        const startY = ((Constants.cell.height) - (Constants.blockProto.height)) / 2;

        blockCTX.clearRect(0,0, blockCanvas.width, blockCanvas.height);

        

        this.drawRect(blockCTX, 
            this.props.block.color,
            startX,
            startY,
            Constants.blockProto.height,
            Constants.blockProto.width);
    }

    drawRect(ctx, fill, x, y, h, w) {
        
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.closePath();
    }


    handleClick() {
        this.props.setViewBlock(
            this.props.row,
            this.props.col);
    }

    render() {
        return (
            <canvas 
            className={`Cell cell-${this.props.row}-${this.props.col}`}
            row={this.props.row}
            col={this.props.col}
            width={Constants.cell.width} 
            height={Constants.cell.height}
            onClick={this.handleClick}
            />

            
        );
    }
};

export default Cell;