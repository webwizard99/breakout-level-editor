import React from 'react';
import './Level.css';

class Level extends React.Component {
    constructor(props) {
        super(props);

        this.handleLoad = this.handleLoad.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleLoad = function() {
        const tId = this.props.lvlId;
        this.props.loadConfirm(tId);
    }

    handleDelete = function() {
        const tId = this.props.lvlId;
        this.props.deleteConfirm(tId);
    }
    
    render() {
        return (
            <div className="Level">
                <span className="levelListNumber">{this.props.num}</span>
                <p>{this.props.name}</p>
                <span className="loadSign"
                    onClick={this.handleLoad}
                >LOAD</span>
                <span className="deleteSign"
                    onClick={this.handleDelete}
                >X</span>
            </div>
        );
    };
};

export default Level;