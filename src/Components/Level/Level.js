import React from 'react';
import './Level.css';

class Level extends React.Component {
    constructor(props) {
        super(props);

        this.handleLoad = this.handleLoad.bind(this);
    }

    handleLoad = function() {
        const tId = this.props.lvlId;
        this.props.loadConfirm(tId);
    } 
    
    render() {
        return (
            <div className="Level">
                <p><span className="levelListNumber">{this.props.num}</span> {this.props.name}</p>
                <span className="loadSign"
                    onClick={this.handleLoad}
                >LOAD</span>
            </div>
        );
    };
};

export default Level;