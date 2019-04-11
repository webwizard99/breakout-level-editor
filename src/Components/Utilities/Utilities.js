import React from 'react';
import './Utilities.css';
import { connect } from 'react-redux';
import { SET_TITLE_FAIL,
  SET_BLOCK_MAP_ID,
  SET_HAS_CHANGES,
  SET_HIGH_SCORE,
  SET_DIALOG_TEXT,
  SET_BLOCK_MAP,
  CHANGE_TITLE,
  ACTIVATE_DIALOG_BOX,
  RESET_DIALOG_RESPONDED,
  SET_GAME_ACTIVE,
  SET_LEVEL_LIST
   } from '../../actions/types';
import LevelStorage from '../../Utils/LevelStorage';
import Dialog from '../../Utils/Dialog';
import InputController from '../../Utils/InputController';
import Levels from '../../Game/breakout/resources/js/utils/Levels.js';
import Level from '../Level/Level';

class Utilities extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          calledDialog: false,
          dialogType: ''
        }
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.getLevelForOutput = this.getLevelForOutput.bind(this);
        this.saveLevel = this.saveLevel.bind(this);
        this.processDialog = this.processDialog.bind(this);
        this.handleNewLevel = this.handleNewLevel.bind(this);
        this.handleLaunch = this.handleLaunch.bind(this);
    }
    
    dialogs = Dialog.createNewDialog({});

    componentDidUpdate() {
      if (this.state.calledDialog & this.props.dialogResponded) {
        this.processDialog();
      }
    }

    getLevelForOutput() {
      const tBlockMap = this.props.blockMap;
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
    
      outputLevel.name = this.props.title;
      outputLevel.map = outputBlockMap;
      return outputLevel;
    }


    
    saveLevel() {
      if (!this.props.hasChanges) {
        console.log('Nothing to save');
        return;
      }

      if (this.props.title === '') {
        this.props.setTitleFail(true);
        return;
      } else {
        if (this.props.titleFail) {
          this.props.setTitleFail(false);
        }
      }

      if (!this.props.hasBlocks) {
        return;
      }
      
      let commitId = this.props.id;

      if (this.props.id === -1) {
        const newId = LevelStorage.getNewId();
        if (newId === -1) {
          alert('Level List is full!');
        } else {
          this.props.setBlockMapId(newId);
        }
        commitId = newId;
      }

      console.log(`commitId: ${commitId}`);
      let checkLvl = LevelStorage.checkLevel(commitId);
      console.log(`checkLvl: ${checkLvl}`);

      const storeMap = this.getLevelForOutput().map;
      let outputLevel = { 
        id: commitId,
        name: this.props.title,
        map: storeMap };

        console.log(outputLevel);
      if (!checkLvl) {
        LevelStorage.addLevel(outputLevel);
      } else {
        LevelStorage.setLevel(outputLevel);
      }

      LevelStorage.saveLevels();
      LevelStorage.setHighScore(0);
      LevelStorage.saveHighScore();
      this.props.setHighScore(0);
      this.props.setLevelList(
        LevelStorage.getLevels(),
        LevelStorage.getListId(),
        LevelStorage.getListName()
      );
      
      this.props.setHasChanges(false);
    }

    processDialog() {
      const tempResponse = InputController.getDialogResponse();
      switch (this.state.dialogType) {
        case this.dialogs.deleteMap:
          if (tempResponse.yes) {
            this.handleNewLevel();
          } else {
            InputController.setDialogNo(false);
            this.setState({
              calledDialog: false,
              dialogType: ''
            });
            this.props.resetDialog();
          }
      }
    }

    handleNewLevel() {
      if (this.props.hasChanges && !this.props.dialogResponded) {
        this.setState({
          calledDialog: true,
          dialogType: this.dialogs.deleteMap
        });

        const textConstruct = `Changes to LEVEL will be lost. Continue?`;
        this.props.setDialogText(textConstruct);
        this.props.createDialogBox();
        return;
      }

      this.props.setBlockMapId(-1);
      this.props.setLevelMap(LevelStorage.getBlankLevel());
      this.props.setLevelTitle('');
      
      this.setState({
        calledDialog: false,
        dialogType: ''
      });
      this.props.resetDialog();

      // this.props.newLevel();
    }

    handleLaunch() {
      
      const tLvls = LevelStorage.getLevelsForGame();

      if (!tLvls) return;
      Levels.setLevels(tLvls);

      this.props.setGameActive(true);  
    }
    
    render() {
        return (
            <div className="Utilities">
                
                <div className="SaveButton"
                    title="save level"
                    onClick={this.saveLevel}
                >
                </div>
                <div className="NewButton"
                    title="new level"
                    onClick={this.handleNewLevel}>
                </div>
                <div className="LaunchGameButton"
                    title="launch game"
                    onClick={this.handleLaunch}>
                    
                </div>
                
            </div>
        )
    }
};

const mapStateToProps = state => {
  return {
    hasChanges: state.appState.hasChanges,
    title: state.title.title,
    titleFail: state.appState.titleFail,
    hasBlocks: state.appState.hasBlocks,
    id: state.blockMap.id,
    blockMap: state.blockMap.blockMap,
    dialogResponded: state.dialog.responded
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTitleFail: (value) => dispatch({ type: SET_TITLE_FAIL, value: value}),
    setBlockMapId: (id) => dispatch({ type: SET_BLOCK_MAP_ID, id: id }),
    setLevelMap: (blockMap) => dispatch({ type: SET_BLOCK_MAP, blockMap: blockMap }),
    setLevelTitle: (title) => dispatch({ type: CHANGE_TITLE, title: title }),
    setHasChanges: (value) => dispatch({ type: SET_HAS_CHANGES, value: value}),
    setHighScore: (score) => dispatch({ type: SET_HIGH_SCORE, score: score }),
    setDialogText: (text) => dispatch({ type: SET_DIALOG_TEXT, text: text }),
    createDialogBox: () => dispatch({ type: ACTIVATE_DIALOG_BOX }),
    resetDialog: () => dispatch({ type: RESET_DIALOG_RESPONDED }),
    setGameActive: (value) => dispatch({ type: SET_GAME_ACTIVE, value: value }),
    setLevelList: (levels, id, name) => dispatch({ type: SET_LEVEL_LIST, levels: levels, id: id, name: name})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Utilities);