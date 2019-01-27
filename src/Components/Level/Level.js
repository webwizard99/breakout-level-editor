import React from 'react';
import './Level.css';
import ReactPos from '../../Utils/ReactPosition';


class Level extends React.Component {
    constructor(props) {
        super(props);


        this.handleLoad = this.handleLoad.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSortUp = this.handleSortUp.bind(this);
        this.handleSortDown = this.handleSortDown.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
    }

    handleLoad = function() {
        const tId = this.props.lvlId;
        this.props.loadConfirm(tId);
    }

    handleDelete = function() {
        const tId = this.props.lvlId;
        this.props.deleteConfirm(tId);
    }

    handleSortUp = function() {
      this.handleSort(this.props.num, this.props.num -1);
    }

    handleSortDown = function() {
      this.handleSort(this.props.num, this.props.num + 1);
    }

    handleSort = function(val1, val2) {
      this.props.sortLevels(val1, val2);
    }

    handleDragEnd = function(e) {
      e.preventDefault();
      e.persist();
      const reactPos = ReactPos.getCurrentDragPos();
      const loc = {
        x: reactPos.x,
        y: reactPos.y
      };
      const tId = this.props.lvlId;
      this.props.handleDrag(tId, loc.x, loc.y);
      this.handleDragLeave(e);
    }

    handleDragOver = function(e) {
      
      let fTarget = e.target;
      if (!fTarget.classList.contains('Level')) {
        fTarget = fTarget.parentNode;
      }

      console.log(fTarget.style.borderBottom);
      if (fTarget.classList.contains('Level')) {
        if (fTarget.style.borderBottom !== '8px solid rgba(240, 245, 250, 0.8)') {
          fTarget.style.borderBottom = '8px solid rgba(240, 245, 250, 0.8)';
        }  
      }

    }

    handleDragLeave = function(e) {
      
      let fTarget = e.target;
      if (!fTarget.classList.contains('Level')) {
        fTarget = fTarget.parentNode;
      }
      console.log(fTarget.style.borderBottom);
      if (fTarget.classList.contains('Level')) {
        if (fTarget === e.target ||
          e.target.classList.contains('loadSign') ||
          e.target.classList.contains('deleteSign')) {
          // fTarget.style.borderBottom = 'none';
          // remove any borders from Level divs
          const lvls = document.querySelectorAll('.Level');
          lvls.forEach(lvl => {
            lvl.style.borderBottom = "none";
          });
        }
      }
    }
    
    render() {
        return (
            <div className="Level"
              draggable="true"
              style={{borderBottom: "none"}}
              onDragEnd={this.handleDragEnd}
              onDragOver={this.handleDragOver}
              onDragLeave={this.handleDragLeave}
              onDragStart={(e) => {
                e.dataTransfer.setData('text',''); 
                
                console.log('drag start');}}
              >
                <span className="levelListNumber">{this.props.num}</span>
                <p>{this.props.name}</p>
                <span className="loadSign"
                    onClick={this.handleLoad}
                >LOAD</span>
                <span className="deleteSign"
                    onClick={this.handleDelete}
                >X</span>
                <div className="sortColumn">
                  <p className="sortUp"
                    onClick={this.handleSortUp}>&#x25B2;</p>
                  <p className="sortDown"
                    onClick={this.handleSortDown}>&#x25BC;</p>
                </div>
            </div>
        );
    };
};

export default Level;