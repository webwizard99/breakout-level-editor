import React from 'react';
import './LevelView.css';
import Constants from '../../Utils/Constants';
import Cell from '../Cell/Cell'

class LevelView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blockMap: []
        }
        this.generateBlankLevel = this.generateBlankLevel.bind(this);
        this.setViewBlock = this.setViewBlock.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }
    
    ////**//**//**//**//**//**//
    // lifecycle Methods
    ///**//**//**//**//**//**///

    componentWillMount() {
        this.generateBlankLevel();
    }

    componentDidUpdate() {
        this.getLevelForRender();
    }

    ////**//**//**//**//**//**//
    ///**//**//**//**//**//**///
    ////**//**//**//**//**//**//

    setViewBlock(row, col) {
        const tBlock = this.props.block;
        let tMap = this.state.blockMap;
        tMap[row][col] = this.props.block;
        this.setState({
            blockMap: tMap
        });
      
    }

    getLevelForRender() {
        if (this.state.blockMap.length > 1) {
            const levelMap = this.state.blockMap;
            let keyCount = -1;
            return ( 
                levelMap.map((row, rowN) => {
                    return ( <div className="ViewRow" key={rowN}>
                    {row.map((col, colN) => {
                        const tCell = col;
                        keyCount += 1;

                        return (
                            <Cell 
                                height={Constants.cell.height}
                                width={Constants.cell.width}
                                row={rowN}
                                col={colN}
                                block={tCell}
                                key={keyCount}
                                serial={keyCount}
                                setViewBlock={this.setViewBlock}
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
        for (let row = 0; row < Constants.rowsProto; row++) {
            
            let tRow = [];
            for (let col= 0; col < Constants.columnsProto; col++ ) {
                tRow.push(false);
            }

            tMap.push(tRow);

        }

        this.setState({
            blockMap: tMap
        });
    }

    render() {
        return (
            <div className="LevelView"
                
                height={Constants.levelSize.y + 10}
                
            >
            {this.getLevelForRender()}
            </div>
        );
    }
};

export default LevelView;