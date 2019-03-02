import React from 'react';
import { connect } from 'react-redux';
import LevelStorage from '../../Utils/LevelStorage';
import './LevelList.css';
import Level from '../Level/Level';
import LevelListTitle from '../LevelListTitle/LevelListTitle';
import { INITIALIZE_LEVEL_LIST,
  SET_BLOCK_MAP } from '../../actions/types';


class LevelList extends React.Component {
    constructor(props) {
        super(props);
        
        this.componentWillMount.bind = this.componentWillMount.bind(this);
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.getListForRender = this.getListForRender.bind(this);
        this.sortLevels = this.sortLevels.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.loadLevel = this.loadLevel.bind(this);
        this.deleteLevel = this.deleteLevel.bind(this);
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
    
    loadLevel() {

    }

    deleteLevel() {

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
                            loadConfirm={this.props.loadConfirm}
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
    listName: state.levelList.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initLevelList: (levels, id, name) => dispatch({type: INITIALIZE_LEVEL_LIST, levels: levels, id: id, name: name })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelList);