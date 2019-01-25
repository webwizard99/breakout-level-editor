import React from 'react';
import Breakout from '../../Game/breakout/resources/js/modules/Controller';

import './GameLayer.css';
import '../../Game/breakout/resources/css/reset.css';
import '../../Game/breakout/resources/css/style.css';
import soundfile from './Crystal_Jewel_Collect_2.wav';

class GameLayer extends React.Component {
    timer = 0

    constructor(props) {
        super(props);

        this.handleCloseGame = this.handleCloseGame.bind(this);
        this.launchGame = this.launchGame.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUpdate = this.componentWillUpdate.bind(this);
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        
    }

    ////**//**//**//**//**//**//
    // lifecycle Methods
    ///**//**//**//**//**//**///

    componentDidMount() {
        this.launchGame();
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        
        if (nextProps.vis !== this.props.vis) {
            return true;
        } else {
            return false;
        }
  
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.vis) {
            this.launchGame();
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        let tScore = Breakout.getHighScoreReact();
        if (tScore > this.props.highScore) {
            this.props.setHighScore(tScore);
            
        }
        
    }

    ////**//**//**//**//**//**//
    ///**//**//**//**//**//**///
    ////**//**//**//**//**//**//
    
    handleCloseGame(e) {
        e.preventDefault();
        clearInterval(this.timer);
        // Breakout.stop();

        // this.launchInWindow('.GameFrame', '');
        this.props.closeGame();
    }

    launchGame() {
        
        Breakout.initReact();
        this.timer = setInterval(Breakout.updateReact, Breakout.getUpdateRateReact());
        Breakout.setHighScoreReact(this.props.highScore);
    }

    render() {
        this.myRef = React.createRef();
        return (
            <div className="GameLayer"
            style={{visibility: this.props.vis}}>
                <section id="mainContainer">
                    <h1 id="title">BREAKOUT</h1>
                    <canvas id="myCanvas" width="640" height="480"></canvas>  
                    <div id="scoreFrame">
                        <p id="score">0</p>
                        <p id="highScore">0</p>
                    </div>
                    <div id="LivesView"></div> 
                    <audio id="BallHit"
                        ref={this.myRef}
                        src={soundfile}
                    />

                </section> 
                <div className="CloseButton"
                    onClick={this.handleCloseGame}>X
                </div>
                
            </div>
        )
    }
}

export default GameLayer;