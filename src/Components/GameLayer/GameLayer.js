import React from 'react';
import './GameLayer.css'

class GameLayer extends React.Component {
    render() {
        return (
            <div className="GameLayer"
                visibility={this.props.vis}>
            </div>
        )
    }
}

export default GameLayer;