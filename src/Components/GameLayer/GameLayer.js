import React from 'react';
import Breakout from '../../Game/breakout/resources/js/modules/Controller';
import { connect } from 'react-redux';
import { SET_GAME_ACTIVE,
  SET_HIGH_SCORE } from '../../actions/types'

import './GameLayer.css';
import '../../Game/breakout/resources/css/reset.css';
import '../../Game/breakout/resources/css/style.css';
import soundfile from './Crystal_Jewel_Collect_2.wav';
import LevelStorage from '../../Utils/LevelStorage';
import Constants from '../../Game/breakout/resources/js/utils/Constants';

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
            LevelStorage.setHighScore(tScore);
            LevelStorage.saveHighScore();
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
        this.props.setGameActive(false);
    }

    launchGame() {
        
        Breakout.initReact();
        this.timer = setInterval(Breakout.updateReact, Breakout.getUpdateRateReact());
        Breakout.setHighScoreReact(this.props.highScore);
    }

    render() {
        this.myRef = React.createRef();
        const tSize = Constants.getLevelSize()
        console.log(`this.props.vis: ${this.props.vis}`);
        const gameVisible = this.props.vis ? 'visible' : 'hidden';
        return (
            <div className="GameLayer"
            style={{ visibility: gameVisible }}>
              <section id="mainContainer">
                <h1 id="title">BREAKOUT</h1>
                <div className="canvas-wrapper">
                  <canvas id="Canvas-background" className="Canvas" width={tSize.x} height={tSize.y} layer="0">
                  </canvas>
                </div>
                <div className="canvas-wrapper">
                  <canvas id="Canvas-player" className="Canvas" width={tSize.x} height={tSize.y} layer="1">
                  </canvas>
                </div>
                <div className="canvas-wrapper">
                  <canvas id="Canvas-blocks" className="Canvas" width={tSize.x} height={tSize.y} layer="2">
                  </canvas>
                </div>
                <div className="canvas-wrapper">
                  <canvas id="Canvas-hud" className="Canvas" width={tSize.x} height={tSize.y} layer="3">
                  </canvas>
                </div>
                <div className="canvas-wrapper">
                  <canvas id="Canvas-effects" className="Canvas" width={tSize.x} height={tSize.y} layer="4">
                  </canvas>
                </div>
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

const mapStateToProps = state => {
  return {
    vis: state.appState.gameActive,
    highScore: state.highScore.score
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setGameActive: (value) => dispatch({ type: SET_GAME_ACTIVE, value: value }),
    setHighScore: (score) => dispatch({ type: SET_HIGH_SCORE, score: score })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameLayer);