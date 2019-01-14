import React from 'react';
import './GameLayer.css'
// import Breakout from '../../Game/breakout/resources/js/app/main';


class GameLayer extends React.Component {
    constructor(props) {
        super(props);

        this.handleCloseGame = this.handleCloseGame.bind(this);
        this.launchGame = this.launchGame.bind(this);
        this.launchInWindow = this.launchInWindow.bind(this);
        this.componentWillUpdate = this.componentWillUpdate.bind(this);
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    }

    ////**//**//**//**//**//**//
    // lifecycle Methods
    ///**//**//**//**//**//**///

    shouldComponentUpdate(nextProps, nextState) {
        
        if (nextProps.vis !== this.props.vis) {
            return true;
        } else {
            return false;
        }
    }

    componentWillUpdate(nextProps, nextState) {
        this.launchGame();
    }

    ////**//**//**//**//**//**//
    ///**//**//**//**//**//**///
    ////**//**//**//**//**//**//

    launchInWindow(frameRef, url) {
        const frame = document.querySelector(frameRef);
        console.log(url);
        frame.url = url;
    }
    
    handleCloseGame(e) {
        e.preventDefault();
        
        // this.launchInWindow('.GameFrame', '');
        this.props.closeGame();
    }

    launchGame() {
        console.log('launch game');
        this.launchInWindow('.GameFrame', 'https://webwizard99.github.io/breakout/');
        // this.launchInWindow('.GameFrame', './breakout/index.html');
                
    }

    render() {
        return (
            <div className="GameLayer"
            style={{visibility: this.props.vis}}>
                <iframe className="GameFrame"
                    title="Breakout"
                >
                </iframe>
                <div className="CloseButton"
                    onClick={this.handleCloseGame}>X
                </div>
            </div>
        )
    }
}

export default GameLayer;