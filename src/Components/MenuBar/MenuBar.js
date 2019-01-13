import React from 'react';
import './MenuBar.css';
import Title from '../Title/Title';
import BlockPicker from '../BlockPicker/BlockPicker';
import ColorPicker from '../ColorPicker/ColorPicker';
import Utilities from '../Utilities/Utilities';

class MenuBar extends React.Component {
    render() {
        return (
            <div className="MenuBar">
                <Title title={this.props.title}
                        changeTitle={this.props.changeTitle}
                />
                <BlockPicker 
                    block={this.props.block}
                    blocksAvailable={this.props.blocksAvailable}
                    blockIndex={this.props.blockIndex}
                    onChangeBlock={this.props.onChangeBlock}
                />
                <ColorPicker />
                <Utilities 
                    saveLevel={this.props.saveLevel}
                    newLevel={this.props.newLevel}
                />
            </div>
        );
    }
};

export default MenuBar;