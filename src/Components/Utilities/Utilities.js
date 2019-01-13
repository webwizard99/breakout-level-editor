import React from 'react';
import './Utilities.css';

class Utilities extends React.Component {
    constructor(props) {
        super(props);
        this.saveLevel = this.saveLevel.bind(this);
        this.handleNewLevel = this.handleNewLevel.bind(this);
    }
    
    saveLevel() {
        this.props.saveLevel();
    }

    handleNewLevel() {
        this.props.newLevel();
    }
    
    render() {
        return (
            <div className="Utilities">
                
                <div className="SaveButton"
                    title="save level"
                    onClick={this.saveLevel}
                >
                </div>
                <div className="NewButton"
                    title="new level"
                    onClick={this.handleNewLevel}>
                </div>
                
            </div>
        )
    }
};

export default Utilities;