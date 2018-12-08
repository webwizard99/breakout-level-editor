import React from 'react';
import './Utilities.css';

class Utilities extends React.Component {
    constructor(props) {
        super(props);
        this.saveLevel = this.saveLevel.bind(this);
    }
    
    saveLevel() {
        this.props.saveLevel();
    }
    
    render() {
        return (
            <div className="Utilities">
                <h1>Utilities</h1>
                <a className="SaveButton"
                    onClick={this.saveLevel}>save</a>
            </div>
        )
    }
};

export default Utilities;