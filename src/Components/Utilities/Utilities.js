import React from 'react';
import './Utilities.css';

class Utilities extends React.Component {
    constructor(props) {
        super(props);
        this.saveLevel = this.saveLevel.bind(this);
        this.handleNewLevel = this.handleNewLevel.bind(this);
        this.handleLaunch = this.handleLaunch.bind(this);
    }
    
    saveLevel() {
        this.props.saveLevel();
    }

    handleNewLevel() {
        this.props.newLevel();
    }

    handleLaunch() {
        this.props.launchGame();
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
                <div className="LaunchGameButton"
                    title="launch game"
                    onClick={this.handleLaunch}>
                    <a className="launchLink"
                        href="../../Game/breakout/index.html"
                        target="_blank"
                    >
                    </a>
                </div>
                
            </div>
        )
    }
};

export default Utilities;