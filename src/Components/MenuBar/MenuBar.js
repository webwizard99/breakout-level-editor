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
                <Title/>
                <div className="Blocks">
                  <BlockPicker/>
                  <Palette/>
                </div>
                <ColorPicker/>
                <Utilities/>
            </div>
        );
    }
};

export default MenuBar;