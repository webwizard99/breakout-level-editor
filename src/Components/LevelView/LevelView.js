import React from 'react';
import './LevelView.css';
import Constants from '../../Game/breakout/resources/js/utils/Constants';
import Cell from '../Cell/Cell'

class LevelView extends React.Component {
    constructor(props) {
        super(props);
 
        this.generateBlankLevel = this.generateBlankLevel.bind(this);
        this.setViewBlock = this.setViewBlock.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.getLevelForRender = this.getLevelForRender.bind(this);
    }
    
    ////**//**//**//**//**//**//
    // lifecycle Methods
    ///**//**//**//**//**//**///

    componentWillMount() {
        //this.generateBlankLevel();
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

    setViewBlock(row, col, color) {
        let tMap = this.props.blockMap;
        let tBlock = JSON.parse(JSON.stringify(this.props.currentBlock));
        tBlock.color = color;
        tMap[row][col] = tBlock;
        this.props.setBlockMap(tMap, true);
        
    }

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
                                currentBlock={this.props.currentBlock}
                                currentColor={this.props.currentColor}
                                serial={keyCount}
                                setViewBlock={this.setViewBlock}
                                eyedrop={this.props.eyedrop}
                            />
                        );
                    })}
                        </div>
                    );
                })
            );
        }
    }
    
    generateBlankLevel() {
        let tMap = [];
        for (let row = 0; row < Constants.getRowsProto(); row++) {
            
            let tRow = [];
            for (let col= 0; col < Constants.getColumnsProto(); col++ ) {
                tRow.push(false);
            }

            tMap.push(tRow);

        }

        this.props.setBlockMap(tMap, false);
    }

    render() {
        
        return (
            <div className="LevelView"
                
                height={Constants.getLevelSize().y + 10}
                width={Constants.getLevelSize().x}        
                
            >
            {this.getLevelForRender()}
            
            
            </div>
        );
    }
};

export default LevelView;