import React from 'react';
import { connect } from 'react-redux';
import './LevelView.css';
import Constants from '../../Game/breakout/resources/js/utils/Constants';
import Cell from '../Cell/Cell';
import LevelStorage from '../../Utils/LevelStorage';

import { SET_BLOCK_MAP,
  INITIALIZE_BLOCK_MAP,
  SET_BLOCK,
  CHANGE_COLOR,
  SET_HAS_CHANGES,
  CHANGE_PALETTE_BLOCK,
  SET_HAS_BLOCKS } from '../../actions/types';

class LevelView extends React.Component {
    constructor(props) {
        super(props);
 
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.eyedrop = this.eyedrop.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.setViewBlock = this.setViewBlock.bind(this);
        this.getLevelForRender = this.getLevelForRender.bind(this);
    }
    
    ////**//**//**//**//**//**//
    // lifecycle Methods
    ///**//**//**//**//**//**///

    componentWillMount() {
      
    }

    componentDidMount() {
      // if (this.props.blockMap.length < 1) {
      //   this.props.initializeBlockMap(LevelStorage.getBlankLevel());
      // }
    }

    shouldComponentUpdate(nextProps) {
        if (this.props === nextProps) {
            return false;
        } else {
            return true;
        }
    }

    componentDidUpdate() {
        // no code?
    }

    ////**//**//**//**//**//**//
    ///**//**//**//**//**//**///
    ////**//**//**//**//**//**//

    getLevelForRender() {
        
        const levelMap = this.props.blockMap;
        
        if (levelMap.length > 1) {
            
            let keyCount = -1;
            return ( 
                levelMap.map((row, rowN) => {
                    return ( <div className="ViewRow" 
                                key={rowN}
                                width={Constants.getLevelSize().x}
                            >
                    {row.map((col, colN) => {
                        // if (colN > Constants.getColumnsProto()) {
                        //     console.log('getLevelForRender: tried to make more columns than ColumnsProto!');
                        //     return;
                        // }
                        const tCell = col;
                        keyCount += 1;

                        return (
                            <Cell 
                                
                                row={rowN}
                                col={colN}
                                block={tCell}
                                key={keyCount}
                                canvasBlock={this.props.canvasBlock}
                                setBlock={this.setViewBlock}
                                serial={keyCount}
                                eyedrop={this.eyedrop}
                            />
                        );
                    })}
                        </div>
                    );
                })
            );
        } else {
          return (
            <div className="DummyLevelView"
              height={Constants.getLevelSize().y}
              width={Constants.getLevelSize().x}>
            </div>
          )
        }
    }

    eyedrop(block) {
      const colorDrop = block.color.replace(')', ', 1)');
      this.props.setColor(colorDrop);
      this.props.setPaletteBlock(block);
    }
    
    handleMouseLeave() {
      const paletteRef = document.querySelector('.Palette');
      paletteRef.focus();
      paletteRef.blur();
    }

    setViewBlock(block, pos) {
      this.props.setHasChanges(true);
      this.props.setHasBlocks(true);
      this.props.setBlock(block, pos);
    }

    render() {
        
        return (
            <div className="LevelView"
                onMouseLeave={this.handleMouseLeave}
                height={Constants.getLevelSize().y + 10}
                width={Constants.getLevelSize().x}        
                
            >
            {this.getLevelForRender()}
            
            
            </div>
        );
    }
};

const mapStateToProps = state => {
  return {
    blockMap: state.blockMap.blockMap,
    canvasBlock: state.palette.blocks[state.palette.currentIndex]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initializeBlockMap: (blockMap) => dispatch({type: INITIALIZE_BLOCK_MAP, blockMap: blockMap}),
    setBlock: (canvasBlock, pos) => dispatch({ type: SET_BLOCK, block: canvasBlock, pos: pos }),
    setColor: (color) => dispatch({ type: CHANGE_COLOR, color: color }),
    setPaletteBlock: (block) => dispatch({type: CHANGE_PALETTE_BLOCK, block: block}),
    setHasChanges: (val) => dispatch({ type: SET_HAS_CHANGES, value: val }),
    setHasBlocks: (val) => dispatch({ type: SET_HAS_BLOCKS, value: val })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LevelView);