import React from 'react';
import './MenuBar.css';
import Title from '../Title/Title';
import BlockPicker from '../BlockPicker/BlockPicker';
import ColorPicker from '../ColorPicker/ColorPicker';
import Palette from '../Palette/Palette';
import Utilities from '../Utilities/Utilities';

class MenuBar extends React.Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props === nextProps) {
            return false;
        } else {
            return true;
        }
    }
    
    render() {
        return (
            <div className="MenuBar">
                <Title title={this.props.title}
                  changeTitle={this.props.changeTitle}
                  titleFail={this.props.titleFail}
                />
                <div className="Blocks">
                  <BlockPicker 
                    block={this.props.block}
                    blocksAvailable={this.props.blocksAvailable}
                    blockIndex={this.props.blockIndex}
                    color={this.props.color}
                    onChangeBlock={this.props.onChangeBlock}
                  />
                  <Palette/>
                </div>
                <ColorPicker 
                  color={this.props.currentColor}
                  changeColor={this.props.changeColor}
                />
                <Utilities 
                  saveLevel={this.props.saveLevel}
                  newLevel={this.props.newLevel}
                  launchGame={this.props.launchGame}
                />
            </div>
        );
    }
};

export default MenuBar;