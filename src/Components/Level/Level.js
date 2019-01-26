import React from 'react';
import './Level.css';

class Level extends React.Component {
    constructor(props) {
        super(props);

        this.handleLoad = this.handleLoad.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSortUp = this.handleSortUp.bind(this);
        this.handleSortDown = this.handleSortDown.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
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
      const loc = {
        x: e.clientX,
        y: e.clientY
      };
      const tId = this.props.lvlId;
      this.props.handleDrag(tId, loc.x, loc.y);
      
    }
    
    render() {
        return (
            <div className="Level"
              draggable="true"
              onDragEnd={this.handleDragEnd}>
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