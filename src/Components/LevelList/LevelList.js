import React from 'react';
import './LevelList.css';
import Level from '../Level/Level';
import LevelListTitle from '../LevelListTitle/LevelListTitle';

class LevelList extends React.Component {
    constructor(props) {
        super(props);
        
        
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.getListForRender = this.getListForRender.bind(this);
        this.sortLevels = this.sortLevels.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    ////**//**//**//**//**//**//
    // lifecycle Methods
    ///**//**//**//**//**//**///

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

    sortLevels(index1, index2) {
      if (index1 <= 0 || index1 > this.props.levelList.length ||
        index2 <= 0 || index2 > this.props.levelList.length) {
        return;
      }
      const id1 = this.props.levelList[index1 -1].id;
      const id2 = this.props.levelList[index2 - 1].id;
      this.props.swapLevels(id1, id2);
    }

    ////**//**//**//**//**//**//
    ///**//**//**//**//**//**///
    ////**//**//**//**//**//**//

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
      const clientMaster = document.querySelector('.LevelList');
      const clientHeights = Array.from(clientMaster.querySelectorAll('.Level'))
        .map(lev => {
          return {
            x: lev.getBoundingClientRect().x,
            y: lev.getBoundingClientRect().y
          }
        });
      let matchY = Math.abs(clientHeights[0].y - y);
      let replaceTarget = 0;
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

export default LevelList;