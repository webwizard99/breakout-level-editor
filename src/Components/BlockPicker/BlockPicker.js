import React from 'react';
import { connect } from 'react-redux';
import './BlockPicker.css';
import Constants from '../../Game/breakout/resources/js/utils/Constants';
import CanvasTools from '../../Utils/CanvasTools';

class BlockPicker extends React.Component {
    constructor(props) {
        super(props);
        this.drawBlock = this.drawBlock.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.state = {
            pickerMain: 2.4
        }
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
    
    drawBlock() {
        const blockCanvas = document.querySelector('.PickerView');
        const blockCTX = blockCanvas.getContext('2d');
        const startX = ((Constants.getCell().width * this.state.pickerMain) - (Constants.getBlockProto().width * this.state.pickerMain)) / 2;
        const startY = ((Constants.getCell().height * this.state.pickerMain) - (Constants.getBlockProto().height * this.state.pickerMain)) / 2;

        blockCTX.clearRect(0,0, blockCanvas.width, blockCanvas.height);

        

        CanvasTools.drawRect(blockCTX, 
            this.props.block.color,
            startX,
            startY,
            Constants.getBlockProto().height * this.state.pickerMain,
            Constants.getBlockProto().width * this.state.pickerMain);
    }
    
    render() {
        return (
            <div className="BlockPicker">
                <canvas className="PickerView" 
                    width={Constants.getCell().width * this.state.pickerMain} 
                    height={Constants.getCell().height * this.state.pickerMain}
                >
                </canvas>
                <div className="Eyedrop-indicator">
                  <p className="Shift">Shift</p><span className="Cursor"></span><span className="Eyedrop toolWindow"></span>
                </div>
                <div className="Eyedrop-indicator">
                  <p className="Shift">Alt</p><span className="Cursor"></span><span className="Eraser toolWindow"></span>
                </div>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        block: state.palette.blocks[state.palette.currentIndex]
    }
}

export default connect(mapStateToProps)(BlockPicker);