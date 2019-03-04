import React from 'react';
import { connect } from 'react-redux';
import LevelStorage from '../../Utils/LevelStorage';
import InputController from '../../Utils/InputController';
import './LevelList.css';
import Level from '../Level/Level';
import LevelListTitle from '../LevelListTitle/LevelListTitle';
import { INITIALIZE_LEVEL_LIST,
  SET_BLOCK_MAP,
  SET_BLOCK_MAP_ID,
  CHANGE_TITLE,
  SET_DIALOG_TEXT,
  ACTIVATE_DIALOG_BOX,
  RESET_DIALOG_RESPONDED,
  SET_LEVEL_LIST,
  SET_HAS_CHANGES } from '../../actions/types';


class LevelList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          calledDialog: false,
          dialogType: '',
          levelEffected: -1
        }
        
        this.componentWillMount = this.componentWillMount.bind(this);
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.getListForRender = this.getListForRender.bind(this);
        this.sortLevels = this.sortLevels.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.loadLevel = this.loadLevel.bind(this);
        this.deleteLevel = this.deleteLevel.bind(this);
        this.processDialog = this.processDialog.bind(this);
    }

    dialogs = {
      loadLevel: 'loadLevel',
      deleteLevel: 'deleteLevel'
    }

    ////**//**//**//**//**//**//
    // lifecycle Methods
    ///**//**//**//**//**//**///

    componentWillMount() {
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
    
    componentDidUpdate() {
        this.getListForRender();
        if (this.state.calledDialog & this.props.dialogResponded) {
          this.processDialog();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (this.props === nextProps) {
            return false;
        } else {
            return true;
        }
    }

    ////**//**//**//**//**//**//
    ///**//**//**//**//**//**///
    ////**//**//**//**//**//**//


    sortLevels(index1, index2) {
      if (index1 <= 0 || index1 > this.props.levelList.length ||
        index2 <= 0 || index2 > this.props.levelList.length) {
        return;
      }
      const id1 = this.props.levelList[index1 -1].id;
      const id2 = this.props.levelList[index2 - 1].id;
      this.props.swapLevels(id1, id2);
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

        this.props.setLevelList(
          LevelStorage.getLevels(),
          LevelStorage.getListId(),
          LevelStorage.getListName()
        );

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
        
        if (levelList.length > 0) {

            let keyCount = -1;
            return (
                levelList.map((level, lvlN) => {
                    keyCount++;
                    return (
                        <Level 
                            key={keyCount}
                            num={lvlN + 1} 
                            name={level.name}
                            lvlId={level.id}
                            loadLevel={this.loadLevel}
                            deleteLevel={this.deleteLevel}
                            deleteConfirm={this.props.deleteConfirm}
                            length={levelList.length + 1}
                            sortLevels={this.sortLevels}
                            handleDrag={this.handleDrag}
                        />
                    )
                })
            );
        } else {
            return <p>No Levels</p>;
        }
    }

    handleDrag(id, x, y) {
      // get position info on all Level components
      const clientMaster = document.querySelector('.LevelList');
      const clientHeights = Array.from(clientMaster.querySelectorAll('.Level'))
        .map(lev => {
          const levRect = lev.getBoundingClientRect();
          return {
            x: levRect.x,
            y: levRect.y,
            height: levRect.height
          }
        });
      

      // find the nearest Level component to the
      // dragEnd positon
      let matchY = Math.abs(clientHeights[0].y - y);
      let replaceTarget = 0;
      // direction: is target above or below element
      let direction = 0;
      
      clientHeights.forEach((tLvlHeight, lvlN) => {
        const tMatchY = Math.abs(tLvlHeight.y - y);
        if (tMatchY < matchY) {
          matchY = tMatchY;
          replaceTarget = lvlN;
          direction = (tLvlHeight.y - y) > 0 ? 0 : -1;
        }
      });
      
      this.props.insertLevel(id, this.props.levelList[replaceTarget].id, direction);

      // remove any borders from Level divs
      const lvls = document.querySelectorAll('.Level');
      lvls.forEach(lvl => {
        lvl.style.borderBottom = "none";
      });
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
    setHasChanges: (val) => dispatch({ type: SET_HAS_CHANGES, hasChanges: val })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelList);