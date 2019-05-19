import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import MenuBar from '../MenuBar/MenuBar';
import LevelView from '../LevelView/LevelView';
import LevelList from '../LevelList/LevelList';
import DialogLayer from '../DialogLayer/DialogLayer';
import MouseoverLayer from '../MouseoverLayer/MouseoverLayer';
import GameLayer from '../GameLayer/GameLayer';
import Navbar from '../Navbar/Navbar';

import LevelCompression from '../../Utils/LevelCompression';

import Levels from '../../Game/breakout/resources/js/utils/Levels';
import LevelStorage from '../../Utils/LevelStorage';
import InputController from '../../Utils/InputController';
import { SET_HIGH_SCORE } from '../../actions/types';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          
      }

      this.componentWillMount = this.componentWillMount.bind(this);
      this.componentDidUpdate = this.componentDidUpdate.bind(this);
      this.exportLevel = this.exportLevel.bind(this);
      this.getGameLayer = this.getGameLayer.bind(this);
      this.getMenuBar = this.getMenuBar.bind(this);
      this.getViewColumn = this.getViewColumn.bind(this);
      this.getNavbar = this.getNavbar.bind(this);
  }


    ////**//**//**//**//**//**//
    // lifecycle Methods
    ///**//**//**//**//**//**///

    componentWillMount() {
        
        // this.syncListStateWithStorage();
        InputController.init();
        LevelStorage.retrieveHighScore();
        this.props.setHighScore(LevelStorage.getHighScore());
        
    }
    
    componentDidUpdate() {
      
    }

    ////**//**//**//**//**//**//
    ///**//**//**//**//**//**///
    ////**//**//**//**//**//**//

  //placeholder
  exportLevel() {
    const levelDupe = this.getLevelForOutput();
    Levels.push(levelDupe);
    const el = document.createElement('textarea');
    el.value = JSON.stringify(levelDupe);
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  getGameLayer() {
      if (this.props.gameActive) {
          return (
            <GameLayer/>
          );
      } else {
          return (
              <div></div>
          )
      }
  }

  getMenuBar() {
      if (!this.props.gameActive) {
          return (
            <MenuBar/>
          )
      } else {
          return (
              <div style={{height: "100vh", width: "100vw"}}>
              </div>
          )
      }
  }

  getViewColumn() {
      if (!this.props.gameActive) {
          return (
            <div className="ViewColumn">
                <LevelView/>
                <LevelList/>
            </div>
          )
      } else {
          return (
              <div>

              </div>
          )
      }
  }

  getNavbar() {
    return <Navbar />
  }

  render() {
    return (
      <div className="App">
        {this.getNavbar()}
        {this.getMenuBar()}
        {this.getViewColumn()}
        <DialogLayer/>
        <MouseoverLayer />
        {this.getGameLayer()}
      </div>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById('App'));

const mapStateToProps = state => {
  return {
    dialogPointer: state.appState.dialogPointer,
    dialogVisible: state.appState.dialogVisible,
    gameActive: state.appState.gameActive
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setHighScore: (score) => dispatch({ type: SET_HIGH_SCORE, score: score })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

