import React from 'react';
import './BlockPicker.css';
import Constants from '../../Utils/Constants';

class BlockPicker extends React.Component {
    constructor(props) {
        super(props);
        this.drawBlock = this.drawBlock.bind(this);
        this.handleChangeBlock = this.handleChangeBlock.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.state = {
            pickerMain: 2.4
        }
    }

    // blocksAvailable = [{
    //     type: 'basic',
    //     color: `rgb(80, 100, 140)`,
    //     hp: 5
    //   },
    //   {
    //     type: 'basic',
    //     color: `rgb(140, 90, 100)`,
    //     hp: 5
    //   }
    // ];

    drawRect(ctx, fill, x, y, h, w) {
        
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.closePath();
    }

    //*//*//*//*//*//*//*//*//
    //*//*//*//*//*//*//*//*//
    // lifecycle methods
    componentDidMount() {
        this.drawBlock();
    }

    componentDidUpdate() {
        this.drawBlock();
    }

    //////////////////////////
    //*//*//*//*//*//*//*//*//
    //*//*//*//*//*//*//*//*//
    
    handleChangeBlock(e) {
        
                
        let index = this.props.blockIndex;
        
        let valence;
        if (e.target.className === 'leftArrow') {
            valence = -1;
        }
        if (e.target.className === 'rightArrow') {
            valence = 1;
        }
        
        let target = index + valence;
        if ((target) <= 0) {
            target = 0;
        }
        if ((target) > this.props.blocksAvailable.length) {
            target = this.props.blocksAvailable.length;
        }

        
        this.props.onChangeBlock(this.props.blocksAvailable[target], target);
        // this.drawBlock();

    }

    drawBlock() {
        const blockCanvas = document.querySelector('.PickerView');
        const blockCTX = blockCanvas.getContext('2d');
        const startX = ((Constants.cell.width * this.state.pickerMain) - (Constants.blockProto.width * this.state.pickerMain)) / 2;
        const startY = ((Constants.cell.height * this.state.pickerMain) - (Constants.blockProto.height * this.state.pickerMain)) / 2;

        blockCTX.clearRect(0,0, blockCanvas.width, blockCanvas.height);

        

        this.drawRect(blockCTX, 
            this.props.block.color,
            startX,
            startY,
            Constants.blockProto.height * this.state.pickerMain,
            Constants.blockProto.width * this.state.pickerMain);
    }
    
    render() {
        return (
            <div className="BlockPicker"> 
                <span className="leftArrow"
                    onClick={this.handleChangeBlock}
                >{`<`}</span>
                <canvas className="PickerView" 
                    width={Constants.cell.width * this.state.pickerMain} 
                    height={Constants.cell.height * this.state.pickerMain}
                >
                </canvas>
                <span className="rightArrow"
                    onClick={this.handleChangeBlock}
                >{`>`}</span>
            </div>
        );
    };
};

export default BlockPicker;