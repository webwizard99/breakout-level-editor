import React from 'react';
import './App.css';
import MenuBar from '../MenuBar/MenuBar';
import LevelView from '../LevelView/LevelView';
import LevelList from '../LevelList/LevelList';
import DialogLayer from '../DialogLayer/DialogLayer';
import MouseoverLayer from '../MouseoverLayer/MouseoverLayer';
import GameLayer from '../GameLayer/GameLayer';


import Levels from '../../Game/breakout/resources/js/utils/Levels';
import LevelStorage from '../../Utils/LevelStorage';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          title: '',
          hasChanges: false,
          deleteApproved: false,
          dialogVisible: false,
          dialogPointer: false,
          gameActive: false,
          titleFail: false,
          confirmationType: '',
          confirmationNeeded: false,
          levelToLoad: -1,
          levelToDelete: -1,
          readyToLoad: false,
          id: -1,
          hasBlocks: false,
          readyToSave: false,
          currentBlockIndex: 0,
          currentBlock: {
            type: 'basic',
            color: `rgba(80, 100, 140)`,
            hp: 5
          },
          currentColor: `rgba(80, 100, 140, 1)`,
          blockMap: [],
          levelList: [],
          listName: '',
          highScore: 0,
          resetHighScore: false
      }

      this.componentWillMount = this.componentWillMount.bind(this);
      this.componentDidUpdate = this.componentDidUpdate.bind(this);
      this.setCurrentBlock = this.setCurrentBlock.bind(this);
      this.setBlockMap = this.setBlockMap.bind(this);
      this.setLevelList = this.setLevelList.bind(this);
      this.saveLevel = this.saveLevel.bind(this);
      this.confirmChanges = this.confirmChanges.bind(this);
      this.callDialog = this.callDialog.bind(this);
      this.processDialog = this.processDialog.bind(this);
      this.hideDialog = this.hideDialog.bind(this);
      this.dialogPrompt = this.dialogPrompt.bind(this);
      this.approveDelete = this.approveDelete.bind(this);
      this.discardLevel = this.discardLevel.bind(this);
      this.newLevel = this.newLevel.bind(this);
      this.loadLevel = this.loadLevel.bind(this);
      this.deleteLevel = this.deleteLevel.bind(this);
      this.promptLoad = this.promptLoad.bind(this);
      this.promptDelete = this.promptDelete.bind(this);
      this.commitChanges = this.commitChanges.bind(this);
      this.getLevelForStorage = this.getLevelForStorage.bind(this);
      this.getLevelForListState = this.getLevelForListState.bind(this);
      this.getDialogMessage = this.getDialogMessage.bind(this);
      this.syncListStateWithStorage = this.syncListStateWithStorage.bind(this);
      this.exportLevel = this.exportLevel.bind(this);
      this.getLevelForOutput = this.getLevelForOutput.bind(this);
      this.changeTitle = this.changeTitle.bind(this);
      this.setBlockFromCell = this.setBlockFromCell.bind(this);
      this.launchGame = this.launchGame.bind(this);
      this.closeGame = this.closeGame.bind(this);
      this.getGameLayer = this.getGameLayer.bind(this);
      this.getMenuBar = this.getMenuBar.bind(this);
      this.getViewColumn = this.getViewColumn.bind(this);
      this.highScoreReset = this.highScoreReset.bind(this);
      this.setHighScore = this.setHighScore.bind(this);
      this.saveHighScore = this.saveHighScore.bind(this);
      this.swapLevels = this.swapLevels.bind(this);
      this.insertLevel = this.insertLevel.bind(this);
      this.changeColor = this.changeColor.bind(this);
  }

  blocksAvailable = [{
        type: 'basic',
        color: `rgba(80, 100, 140)`,
        hp: 5
    },
    {
        type: 'basic',
        color: `rgba(140, 90, 100)`,
        hp: 5
    }, 
    false
  ];


    ////**//**//**//**//**//**//
    // lifecycle Methods
    ///**//**//**//**//**//**///

    componentWillMount() {
        // LevelStorage.retrieveRecords();
        LevelStorage.retrieveLevels();
        this.syncListStateWithStorage();
        // this.setState({
        //     blockMap: LevelStorage.getBlankLevel()
        // });
        this.setBlockMap(LevelStorage.getBlankLevel(), false);
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


  highScoreReset() {
    this.setState({
        resetHighScore: true
    });
  }

  setHighScore(val) {
    this.setState({
        highScore: val
    });
    this.saveHighScore(val);
  }

  changeTitle(newTitle) {
    if (newTitle !== '') {
        this.setState({
            title: newTitle
        });
        this.setState({
            hasChanges: true
            
        });
    }
  }

  setCurrentBlock(block, index) {
      if(block) {
          this.setState({
              currentBlock: block,
              currentBlockIndex: index
            });
      }
  }

  setBlockMap(map, val) {
    
    this.setState({
        blockMap: map    
    });
    this.setState({
        hasChanges: val     
    });
    this.setState({
        hasBlocks: val
    });
    
  }

  setLevelList(list) {
      this.setState({
          levelList: list
      });
  }

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

  confirmChanges() {
    this.setState({
        dialogVisible: true,
        dialogPointer: true
    });
  }

  hideDialog() {
    this.setState({
        dialogVisible: false,
        dialogPointer: false
    });
  }

  dialogPrompt(type) {
    const confirmationCases = ['new', 'load', 'delete'];  
    if (confirmationCases.find(conCase => conCase === type)) {
        this.setState({ confirmationType: type});
        this.setState({ confirmationNeeded: true });
    } else {
        console.log('Invalid dialog promt in dialogPrompt!');
    }
  }

  callDialog() {
    
    this.confirmChanges(); 
  }

  processDialog(res) {
    // var res = response from dialog box
    switch (this.state.confirmationType) {
        case 'new':
            if (res) {
                this.approveDelete();
            } 
            break;
        case 'load':
            if (res) {
                this.setState({
                    readyToLoad: true,
                    blockMap: []
                });
            }
            break;
        case 'delete':
            if (res) {
                this.deleteLevel()
            }
            break;
        default:
            break;

    }

    this.setState({
        confirmationNeeded: false,
        confirmationType: ''
    });
    this.hideDialog();
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

  deleteLevel() {
    const lvlToDelete = this.state.levelToDelete
    LevelStorage.deleteLevel(lvlToDelete);
    if (lvlToDelete === this.state.id) {
        this.setState({
            deleteApproved: true
        });
    }
    LevelStorage.saveLevels();
    LevelStorage.setHighScore(0);
    LevelStorage.saveHighScore();
    this.setState({
        highScore: 0
    });
    this.syncListStateWithStorage();
  }

  approveDelete() {
      this.setState({deleteApproved: true});
  }

  promptLoad(id) {
    this.setState({confirmationType: 'load'});
    this.setState({levelToLoad: id});
    if (this.state.hasChanges) {
        this.callDialog();
    } else {
        this.loadLevel(id);
    }
  }

  promptDelete(id) {
      this.setState({confirmationType: 'delete'});
      this.setState({levelToDelete:id});
      this.callDialog();
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
    
    this.syncListStateWithStorage();

    this.setState({
        hasChanges: false
    });

    this.setState({
        readyToSave: false
    });

    
  }

  syncListStateWithStorage() {
      const tLevels = LevelStorage.getLevels();
      const tListName = LevelStorage.getListName();
    //   const tListState = this.state.levelList;
      const tList = [];

      if (!tLevels) return;

      tLevels.forEach(level => {
        const tId = level.id;
        const tName = level.name;
        tList.push({name: tName, id: tId});
      });

      this.setState({
        levelList: tList,
        listName: tListName
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

  getLevelForStorage() {
    const storeMap = this.getLevelForOutput().map;    
    let outputLevel = { 
        id: this.state.id,
        name: this.state.title,
        map: storeMap };

    return outputLevel;
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

  getDialogMessage() {
      if (this.state.dialogVisible) {
        let levelName = '';
        if (this.state.confirmationType === 'delete') {
            const deleteId = this.state.levelToDelete;
            const deleteName = LevelStorage.getLevel(deleteId).name.toUpperCase();
            levelName = deleteName;
        } else {
            levelName = this.state.title.toUpperCase() || 'LEVEL';
        }
        return `Changes to ${levelName} will be lost. Proceed anyway?`
      }
  }

  saveHighScore(val) {
    
    const tHighScore = val;
    if (tHighScore > LevelStorage.getHighScore()) {
        LevelStorage.setHighScore(tHighScore);
        LevelStorage.saveHighScore();
    }
  }

  setBlockFromCell(cellBlock) {
    this.setState({
      currentBlock: cellBlock
    });
    const tColor = cellBlock.color.replace(")", ", 1)");
    this.setState({
      currentColor: tColor
    })
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
      if (this.state.gameActive) {
          return (
            <GameLayer
                vis={this.state.gameActive ? 'visible' : 'hidden'}
                closeGame={this.closeGame}
                highScore={this.state.highScore}
                setHighScore={this.setHighScore}
                
            />
          );
      } else {
          return (
              <div></div>
          )
      }
  }

  getMenuBar() {
      if (!this.state.gameActive) {
          return (
            <MenuBar 
                title={this.state.title}
                block={this.state.currentBlock}
                blocksAvailable={this.blocksAvailable}
                blockIndex={this.state.currentBlockIndex}
                changeTitle={this.changeTitle}
                changeColor={this.changeColor}
                color={this.state.currentColor}
                titleFail={this.state.titleFail}
                onChangeBlock={this.setCurrentBlock}
                newLevel={this.newLevel}
                saveLevel={this.saveLevel}
                launchGame={this.launchGame}
                currentColor={this.state.currentColor}
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
      if (!this.state.gameActive) {
          return (
            <div className="ViewColumn">
                <LevelView 
                    setBlock={this.setViewBlock}
                    currentColor={this.state.currentColor}
                    setBlockMap={this.setBlockMap}
                    blockMap={this.state.blockMap}
                    readyToLoad={this.state.readyToLoad}
                    currentBlock={this.state.currentBlock}
                    eyedrop={this.setBlockFromCell}
                />
                <LevelList levelList={this.state.levelList}
                    loadConfirm={this.promptLoad}
                    deleteConfirm={this.promptDelete}
                    listName={this.state.listName}
                    highScore={this.state.highScore}
                    swapLevels={this.swapLevels}
                    insertLevel={this.insertLevel}
                />
            </div>
          )
      } else {
          return (
              <div>

              </div>
          )
      }
  }

  swapLevels(id1, id2) {
    
    LevelStorage.swapLevels(id1, id2);
    this.syncListStateWithStorage();
    LevelStorage.setHighScore(0);
    LevelStorage.saveHighScore();
    this.setState({
        highScore: 0
    });
    LevelStorage.saveLevels();
  }

  insertLevel(id1, id2, direction) {
    LevelStorage.insertLevel(id1, id2, direction);
    this.syncListStateWithStorage();
    LevelStorage.setHighScore(0);
    LevelStorage.saveHighScore();
    this.setState({
        highScore: 0
    });
    LevelStorage.saveLevels();
  }

  changeColor(color) {
    this.setState({
      currentColor: color
    });

    let tBlock = this.state.currentBlock;
    tBlock.color = color;
    this.setState({
      currentBlock: tBlock
    });
  }
  
  render() {
    return (
      <div className="App">
        {this.getMenuBar()}
        {this.getViewColumn()}
        <DialogLayer pointer={this.state.dialogPointer ? 'all' : 'none'}
            vis={this.state.dialogVisible ? 'visible' : 'hidden'}
            dialogEnabled={this.state.dialogVisible}
            dialogMessage={this.getDialogMessage()}
            processDialog={this.processDialog}
        />
        <MouseoverLayer />
        {this.getGameLayer()}
      </div>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById('App'));

export default App;

