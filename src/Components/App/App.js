import React from 'react';
import './App.css';
import MenuBar from '../MenuBar/MenuBar';
import LevelView from '../LevelView/LevelView';
import LevelList from '../LevelList/LevelList';
import DialogLayer from '../DialogLayer/DialogLayer';
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
          confirmationType: '',
          confirmationNeeded: false,
          levelToLoad: -1,
          readyToLoad: false,
          id: -1,
          hasBlocks: false,
          readyToSave: false,
          currentBlockIndex: 0,
          currentBlock: {
            type: 'basic',
            color: `rgb(80, 100, 140)`,
            hp: 5
          },
          blockMap: [],
          levelList: []
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
      this.promptLoad = this.promptLoad.bind(this);
      this.commitChanges = this.commitChanges.bind(this);
      this.getLevelForStorage = this.getLevelForStorage.bind(this);
      this.getLevelForListState = this.getLevelForListState.bind(this);
      this.getDialogMessage = this.getDialogMessage.bind(this);
      this.syncListStateWithStorage = this.syncListStateWithStorage.bind(this);
      this.exportLevel = this.exportLevel.bind(this);
      this.getLevelForOutput = this.getLevelForOutput.bind(this);
      this.changeTitle = this.changeTitle.bind(this);

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
        
    }
    
    componentDidUpdate() {
        if (this.state.readyToSave) {
            this.commitChanges();
            LevelStorage.saveLevels();
        }

        if (this.state.deleteApproved) {
            this.discardLevel();
        }

        if (this.state.confirmationNeeded && !this.state.dialogVisible) {
            this.callDialog();
        }

        if (this.state.readyToLoad) {
            this.loadLevel(this.state.levelToLoad);
        }
        
        // this.syncListStateWithStorage();
    }

    ////**//**//**//**//**//**//
    ///**//**//**//**//**//**///
    ////**//**//**//**//**//**//

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

  setBlockMap(map, change) {
    
    this.setState({
        blockMap: map    
    });
    this.setState({
        hasChanges: change     
    });
    this.setState({
        hasBlocks: change
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
         return;
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
    console.log(lvlId);
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
            blockMap: []
        });
      }
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

    
    this.syncListStateWithStorage();

    this.setState({
        hasChanges: false
    });

    this.setState({
        readyToSave: false
    })
  }

  syncListStateWithStorage() {
      const tLevels = LevelStorage.getLevels();
    //   const tListState = this.state.levelList;
      const tList = [];

      if (!tLevels) return;

      tLevels.forEach(level => {
        const tId = level.id;
        const tName = level.name;
        tList.push({name: tName, id: tId});
      });

      this.setState({
        levelList: tList
      });
  }

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
    
    let outputLevel = { 
        id: this.state.id,
        name: this.state.title,
        map: this.state.blockMap };

    // console.log(outputLevel);
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
                    
                    .replace(')', ', %alpha)');
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
        return `Changes to ${this.state.title.toUpperCase() || 'LEVEL'} will be lost. Proceed anyway?`
      }
  }
  
  render() {
    return (
      <div className="App">
        <MenuBar 
            title={this.state.title}
            block={this.state.currentBlock}
            blocksAvailable={this.blocksAvailable}
            blockIndex={this.state.currentBlockIndex}
            changeTitle={this.changeTitle}
            onChangeBlock={this.setCurrentBlock}
            newLevel={this.newLevel}
            saveLevel={this.saveLevel}
        />
        <div className="ViewColumn">
            <LevelView 
                setBlock={this.setViewBlock}
                block={this.state.currentBlock}
                setBlockMap={this.setBlockMap}
                blockMap={this.state.blockMap}
                readyToLoad={this.state.readyToLoad}
            />
            <LevelList levelList={this.state.levelList}
                loadConfirm={this.promptLoad}
                
            />
        </div>
        <DialogLayer pointer={this.state.dialogPointer ? 'all' : 'none'}
            vis={this.state.dialogVisible ? 'visible' : 'hidden'}
            dialogEnabled={this.state.dialogVisible}
            dialogMessage={this.getDialogMessage()}
            processDialog={this.processDialog}
        />
      </div>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById('App'));

export default App;

