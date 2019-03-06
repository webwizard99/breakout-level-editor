import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import MenuBar from '../MenuBar/MenuBar';
import LevelView from '../LevelView/LevelView';
import LevelList from '../LevelList/LevelList';
import DialogLayer from '../DialogLayer/DialogLayer';
import MouseoverLayer from '../MouseoverLayer/MouseoverLayer';
import GameLayer from '../GameLayer/GameLayer';


import Levels from '../../Game/breakout/resources/js/utils/Levels';
import LevelStorage from '../../Utils/LevelStorage';
import BlockManager from '../../Utils/BlockManager';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          deleteApproved: false,
          gameActive: false,
          titleFail: false,
      }

      this.componentWillMount = this.componentWillMount.bind(this);
      this.componentDidUpdate = this.componentDidUpdate.bind(this);
      this.saveLevel = this.saveLevel.bind(this);
      this.discardLevel = this.discardLevel.bind(this);
      this.newLevel = this.newLevel.bind(this);
      this.commitChanges = this.commitChanges.bind(this);
      this.getLevelForListState = this.getLevelForListState.bind(this);
      this.exportLevel = this.exportLevel.bind(this);
      this.getLevelForOutput = this.getLevelForOutput.bind(this);
      this.launchGame = this.launchGame.bind(this);
      this.closeGame = this.closeGame.bind(this);
      this.getGameLayer = this.getGameLayer.bind(this);
      this.getMenuBar = this.getMenuBar.bind(this);
      this.getViewColumn = this.getViewColumn.bind(this);
  }


    ////**//**//**//**//**//**//
    // lifecycle Methods
    ///**//**//**//**//**//**///

    componentWillMount() {
        
        // this.syncListStateWithStorage();
        
        LevelStorage.retrieveHighScore();
        this.setState({
            highScore: LevelStorage.getHighScore()
        });
        
    }
    
    componentDidUpdate() {
      
      if (this.state.readyToSave) {
            this.commitChanges();
            LevelStorage.saveLevels();
            this.highScoreReset();
        }

        if (this.state.deleteApproved) {
            this.discardLevel();
            this.highScoreReset();
        }

        if (this.state.confirmationNeeded && !this.state.dialogVisible) {
            this.callDialog();
        }

        if (this.state.readyToLoad) {
            this.loadLevel(this.state.levelToLoad);
            this.highScoreReset();
        }

        if (this.state.resetHighScore) {
            this.setState({
                resetHighScore: false
            });
            this.setHighScore(0);

        }
        
        // this.syncListStateWithStorage();
    }

    ////**//**//**//**//**//**//
    ///**//**//**//**//**//**///
    ////**//**//**//**//**//**//


  saveLevel() {
     if (!this.state.hasChanges) {
        console.log('Nothing to save!');
        return;
     }

     if (this.state.title === '') {
         console.log(`can't save a level without a name!`);
         this.setState({
             titleFail: true
         });
         return;
     } else {
         if (this.state.titleFail) {
             this.setState({
                 titleFail: false
             });
         }
     }

     if (!this.state.hasBlocks) {
         console.log(`can't save a level without blocks!`);
         return;
     }

     // check if current level doesn't have id
     
     if (this.state.id === -1) {
         const newId = LevelStorage.getNewId();
         if (newId === -1) {
             alert('Level List is full!');
         } else {
             this.setState({
                 id: newId 
            });
         }
     }

     this.setState({
         readyToSave: true
     });
     
  }

  newLevel() {
    if (!this.state.hasChanges) {
        this.discardLevel();
    } else {
        this.dialogPrompt('new');
    }
  }

  loadLevel(lvlId) {
    const newLvl = LevelStorage.getLevel(lvlId);
    this.setState({
        title: newLvl.name,
        id: newLvl.id,
        blockMap: newLvl.map,
        readyToLoad: false
    });
    
  }

  
  discardLevel() {
      if (!this.state.hasChanges || this.state.deleteApproved) {
        this.setState({
            title: '',
            hasChanges: false,
            deleteApproved: false,
            id: -1,
            hasBlocks: false,
            readyToSave: false,
            dialogVisible: false,
            dialogPointer: false,
            blockMap: LevelStorage.getBlankLevel()
        });
      }
  }

  commitChanges() {
    // check if level is in LevelList.js
    let cLvl = LevelStorage.checkLevel(this.state.id);

    // if level is new, post to LevelList
    if (!cLvl) {
        LevelStorage.addLevel(this.getLevelForStorage());
    } else {

    // if level is modified, put to LevelList
    LevelStorage.setLevel(this.getLevelForStorage());
    }

    LevelStorage.setHighScore(0);
    LevelStorage.saveHighScore();
    this.setState({
        highScore: 0
    });
    
    // this.syncListStateWithStorage();

    this.setState({
        hasChanges: false
    });

    this.setState({
        readyToSave: false
    });

    
  }

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

  getLevelForListState(lvl) {
    if (!lvl) return false;
    return {
        name: lvl.name,
        id: lvl.id
    }
  }

  getLevelForOutput() {
    const tBlockMap = this.state.blockMap;
    let outputLevel = { name: '', map: [] };
    let outputBlockMap = [];
    tBlockMap.forEach((row, rowN) => {
      let tRow = [];
      row.forEach((col, colN) => {
          if (!col) {
              tRow.push(false);
              
          } else {
              const tBlock = col;
              const colorOut = tBlock.color
                  
                  .replace(', 1)', ')');
              tRow.push({
                  width: 1,
                  hp: tBlock.hp,
                  density: 1,
                  type: tBlock.type,
                  row: rowN,
                  col: colN,
                  color: colorOut
                  
              });
          }
      });
      outputBlockMap.push(tRow);
    });
  
    outputLevel.name = this.state.title;
    outputLevel.map = outputBlockMap;
    return outputLevel;
  }

  launchGame() {
    
    const tLvls = LevelStorage.getLevelsForGame();

    
    if (!tLvls) return;
    Levels.setLevels(tLvls);
    // tLvls.forEach(tLvl => {
    //     Levels.push(tLvl);
    // })
    
    this.setState({
        gameActive: true
    })
    
  }

  closeGame() {
    this.setState({
        gameActive: false
    });
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
            <MenuBar 
                titleFail={this.state.titleFail}
                newLevel={this.newLevel}
                launchGame={this.launchGame}
            />
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

  render() {
    return (
      <div className="App">
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

export default connect(mapStateToProps)(App);

