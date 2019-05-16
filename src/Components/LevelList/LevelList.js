import React from 'react';
import { connect } from 'react-redux';
import LevelStorage from '../../Utils/LevelStorage';
import InputController from '../../Utils/InputController';
import Constants from '../../Game/breakout/resources/js/utils/Constants.js';
import './LevelList.css';
import Level from '../Level/Level';
import DummyLevel from '../Level/DummyLevel';
import LevelListTitle from '../LevelListTitle/LevelListTitle';
import { INITIALIZE_LEVEL_LIST,
  SET_BLOCK_MAP,
  SET_BLOCK_MAP_ID,
  CHANGE_TITLE,
  SET_DIALOG_TEXT,
  ACTIVATE_DIALOG_BOX,
  RESET_DIALOG_RESPONDED,
  SET_LEVEL_LIST,
  SET_HAS_CHANGES,
  SET_HIGH_SCORE } from '../../actions/types';
import Dialog from '../../Utils/Dialog';

class LevelList extends React.Component {
    wait = 0;
  
    constructor(props) {
        super(props);

        this.state = {
          calledDialog: false,
          dialogType: '',
          levelEffected: -1,
          levelSwapped: -1,
          dragEle: '',
          dragTargetId: -1,
          dragTarget: -1,
          direction: ''
        }
        
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.initializeLevelList = this.initializeLevelList.bind(this);
        this.getListForRender = this.getListForRender.bind(this);
        this.refreshScore = this.refreshScore.bind(this);
        this.syncLevels = this.syncLevels.bind(this);
        this.restoreSwappedLevel = this.restoreSwappedLevel.bind(this);
        this.swapLevels = this.swapLevels.bind(this);
        this.sortLevels = this.sortLevels.bind(this);
        this.insertLevel = this.insertLevel.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.loadLevel = this.loadLevel.bind(this);
        this.deleteLevel = this.deleteLevel.bind(this);
        this.processDialog = this.processDialog.bind(this);
        this.resetDragDummy = this.resetDragDummy.bind(this);
        this.setDragEle = this.setDragEle.bind(this);
        this.setDragTarget = this.setDragTarget.bind(this);
        this.setDirection = this.setDirection.bind(this);
    }

    dialogs = Dialog.createNewDialog({});

    ////**//**//**//**//**//**//
    // lifecycle Methods
    ///**//**//**//**//**//**///

    componentWillMount() {
      
    }

    componentDidMount() {
      this.initializeLevelList();
    }
    
    componentDidUpdate() {
        this.getListForRender();
        if (this.state.calledDialog & this.props.dialogResponded) {
          this.processDialog();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props !== nextProps || this.state !== nextState) {
            return true;
        } else {
            return false;
        }
    }

    ////**//**//**//**//**//**//
    ///**//**//**//**//**//**///
    ////**//**//**//**//**//**//

    resetDragDummy() {
      this.setState({
        dragEle: '',
        dragEleId: -1,
        dragTarget: -1,
        direction: ''
      });
    }

    setDragEle(ele) {
      this.setState({
        dragEle: ele
      });
    }

    setDragTarget(cell) {
      const cellNum = cell.num;
      const cellId = cell.ele;
      if (cellNum > 0) {
        this.setState({
          dragTarget: cellNum,
          dragTargetId: cellId
        });
      }
    }

    setDirection(dirText) {
      if (!!dirText) {
        this.setState({
          direction: dirText
        });
      }
    }

    initializeLevelList() {
      LevelStorage.retrieveLevels();
      const stagedLevels = LevelStorage.getLevels();
      const stagedId = LevelStorage.getListId();
      const stagedName = LevelStorage.getListName();
      this.props.initLevelList(
        stagedLevels,
        stagedId,
        stagedName
      );
    }

    refreshScore() {
      const savedScore = LevelStorage.getHighScore();
      this.props.setHighScore(savedScore);
      LevelStorage.saveHighScore();
    }

    syncLevels() {
      this.props.setLevelList(
        LevelStorage.getLevels(),
        LevelStorage.getListId(),
        LevelStorage.getListName());
    }

    restoreSwappedLevel() {
      console.log('restoreSwappedLevel');
      this.setState({
        levelSwapped: -1
      });
    }
    
    swapLevels(id1, id2) {
      LevelStorage.swapLevels(id1, id2);
      LevelStorage.saveLevels();
      // this.syncListStateWithStorage();
      LevelStorage.setHighScore(0);
      LevelStorage.saveHighScore();
      this.setState({
        levelSwapped: id1
      });
      this.syncLevels();
      
      this.refreshScore();
    }

    sortLevels(index1, index2) {
      if (index1 <= 0 || index1 > this.props.levelList.length ||
        index2 <= 0 || index2 > this.props.levelList.length) {
        return;
      }
      const id1 = this.props.levelList[index1 -1].id;
      const id2 = this.props.levelList[index2 - 1].id;
      this.swapLevels(id1, id2);
    }
    
    loadLevel(id) {
      const levelToLoad = LevelStorage.getLevel(id);
      if (this.props.hasChanges) {
        this.setState({
          calledDialog: true,
          dialogType: this.dialogs.loadLevel,
          levelEffected: id
        });
        
        const textConstruct = `Changes to ${this.props.currentLvlTitle.toUpperCase() || 'LEVEL'} will be lost. Continue?`;
        this.props.setDialogText(textConstruct);
        this.props.createDialogBox();
        return;
      }

      if (this.state.calledDialog && InputController.getDialogStatus()) {
        InputController.setDialogYes(false);
        InputController.setDialogNo(false);
        this.setState({
          calledDialog: false,
          dialogType: ''
        });
        this.props.resetDialog();
      }
      
      this.props.setLevelId(levelToLoad.id);
      this.props.setLevelMap(levelToLoad.map);
      this.props.setLevelTitle(levelToLoad.name);

    }

    deleteLevel(id) {
      const levelToDelete = LevelStorage.getLevel(id);
      if (! this.props.dialogResponded) {
        this.setState({
          calledDialog: true,
          dialogType: this.dialogs.deleteLevel,
          levelEffected: id
        });
        
        let currentLevelAddendum = '';
        if (this.props.currentLvlId === id) {
          currentLevelAddendum = ` This is the level you're working on.`
        }
        const textConstruct = `${levelToDelete.name.toUpperCase() || 'LEVEL'} will be deleted.${currentLevelAddendum} Continue?`;
        this.props.setDialogText(textConstruct);
        this.props.createDialogBox();
      } else {
        if (this.props.currentLvlId === id) {
          
          this.props.setLevelId(-1);
          this.props.setLevelMap(LevelStorage.getBlankLevel());
          this.props.setLevelTitle('');
        }

        LevelStorage.deleteLevel(id);
        LevelStorage.saveLevels();
        
        if (this.state.calledDialog && InputController.getDialogStatus()) {
          InputController.setDialogYes(false);
          InputController.setDialogNo(false);
          this.setState({
            calledDialog: false,
            dialogType: ''
          });
          this.props.resetDialog();
        }

        this.props.setHasChanges(false);

        this.syncLevels();

        LevelStorage.setHighScore(0);
        LevelStorage.saveHighScore();
        this.refreshScore();

      }
      
    }

    processDialog() {
      const tempResponse = InputController.getDialogResponse();
      switch (this.state.dialogType) {
        case this.dialogs.loadLevel:
          if (tempResponse.yes) {
            this.loadLevel(this.state.levelEffected);
          } else {
            InputController.setDialogNo(false);
            this.setState({
              calledDialog: false,
              dialogType: '',
              levelEffected: -1
            });
            this.props.resetDialog();
          }
          break;
        case this.dialogs.deleteLevel:
          if (tempResponse.yes) {
            this.deleteLevel(this.state.levelEffected);
          } else {
            InputController.setDialogNo(false);
            this.setState({
              calledDialog: false,
              dialogType: '',
              levelEffected: -1
            });
            this.props.resetDialog();
          }
      }
    }

    getListForRender() {
        
        let levelList = this.props.levelList;
        // swappedNum is for post-swapping animation
        const swappedNum = this.state.levelSwapped;
        let swapped = false;
        // dummy is used during drag events
        const dummy = { target: this.state.dragTarget - 1, direction: this.state.direction };
        let dummyEle;
        if (dummy.target > 0) {
          dummyEle = (
            <DummyLevel 
              key={'dragDummy'}
              num={this.state.dragEle.num}
              name={this.state.dragEle.name}
              setDragTarget={this.setDragTarget}
              setDirection={this.setDirection}
            />
          )
        }

        let dragBackground = {
          opacity: .4
        }

        if (levelList.length > 0) {
            let draggedEle = this.state.dragEle.num;
            
            let keyCount = -1;
            return (
                levelList.map((level, lvlN) => {
                    keyCount++;
                    if (level.id === swappedNum) {
                      swapped = true;
                    } else {
                      swapped = false;
                    }
                    let isBeingDragged = false;
                    if (lvlN === draggedEle) {
                      isBeingDragged = true;
                    }
                    
                    return (
                        <div key={lvlN}>
                          {dummy.target === lvlN && dummy.direction === 'top' ? dummyEle : (<span key="topdummy"></span>)}
                          <Level 
                            key={keyCount}
                            num={lvlN + 1} 
                            name={level.name}
                            lvlId={level.id}
                            loadLevel={this.loadLevel}
                            swapped={swapped}
                            resetSwapAnimation={this.restoreSwappedLevel}
                            deleteLevel={this.deleteLevel}
                            length={levelList.length + 1}
                            sortLevels={this.sortLevels}
                            handleDrag={this.handleDrag}
                            setDragEle={this.setDragEle}
                            setDragTarget={this.setDragTarget}
                            setDirection={this.setDirection}
                            beingDragged={isBeingDragged}
                          />
                          {dummy.target === lvlN && dummy.direction === 'bottom' ? dummyEle : (<span key="bottomdummy"></span>)}
                        </div>
                    )
                })
            );
        } else {
            return <p>No Levels</p>;
        }
    }

    insertLevel(id1, id2, direction) {
      LevelStorage.insertLevel(id1, id2, direction);
      this.syncLevels();
      LevelStorage.setHighScore(0);
      LevelStorage.saveHighScore();
      this.props.setHighScore(0);
      LevelStorage.saveLevels();
      this.setState({
        levelSwapped: id1
      });
    }

    handleDrag(x, y) {
      
      
      const id = this.state.dragEle.id;
      let replaceTarget = 0;
      // direction: is target above or below element
      let direction = 0;
      
      if (this.state.dragTarget > 0) {
        replaceTarget = this.state.dragTarget - 1;
        
        if (this.state.direction === 'top') {
          // replaceTarget -= 1;
          direction = -1;
        } else if (this.state.direction === 'bottom') {
          // replaceTarget += 1;
          direction = 1;
        }
      }
      
      this.insertLevel(id, this.props.levelList[replaceTarget].id, direction);

      this.resetDragDummy();
    }
    
    render() {
        return (
            <div className="LevelList">
                <LevelListTitle listName={this.props.listName}
                    highScore={this.props.highScore}
                />
                {this.getListForRender()}
            </div>
        );
    }
};

const mapStateToProps = state => {
  return {
    levelList: state.levelList.levels,
    id: state.levelList.id,
    listName: state.levelList.name,
    hasChanges: state.appState.hasChanges,
    highScore: state.highScore.score,
    dialogResponded: state.dialog.responded,
    currentLvlTitle: state.title.title,
    currentLvlId: state.blockMap.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initLevelList: (levels, id, name) => dispatch({ type: INITIALIZE_LEVEL_LIST, levels: levels, id: id, name: name }),
    setLevelId: (id) => dispatch({ type: SET_BLOCK_MAP_ID, id: id }),
    setLevelMap: (blockMap) => dispatch({ type: SET_BLOCK_MAP, blockMap: blockMap }),
    setLevelTitle: (title) => dispatch({ type: CHANGE_TITLE, title: title }),
    setDialogText: (text) => dispatch({ type: SET_DIALOG_TEXT, text: text }),
    createDialogBox: () => dispatch({ type: ACTIVATE_DIALOG_BOX }),
    resetDialog: () => dispatch({ type: RESET_DIALOG_RESPONDED }),
    setLevelList: (levels, id, name) => dispatch({ type: SET_LEVEL_LIST, levels: levels, id: id, name: name}),
    setHasChanges: (val) => dispatch({ type: SET_HAS_CHANGES, hasChanges: val }),
    setHighScore: (score) => dispatch({ type: SET_HIGH_SCORE, score: score })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelList);