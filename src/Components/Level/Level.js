import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Level.css';
import ReactPos from '../../Utils/ReactPosition';
import Constants from '../../Game/breakout/resources/js/utils/Constants.js';


class Level extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          swapped: false
        }

        this.componentWillMount = this.handleLoad.bind(this);
        this.componentWillUpdate = this.componentWillUpdate.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSortUp = this.handleSortUp.bind(this);
        this.handleSortDown = this.handleSortDown.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.startAnimation = this.startAnimation.bind(this);
        this.endAnimation = this.endAnimation.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
    }

    componentWillMount() {
      if (this.props.swapped) {

      }
    }

    componentWillUpdate(nextProps) {
      if (!this.props.swapped & nextProps.swapped) {
        this.setState({
          swapped: true
        })
      }

    }

    handleLoad = function() {
        const tId = this.props.lvlId;
        this.props.loadLevel(tId);
    }

    handleDelete = function() {
        const tId = this.props.lvlId;
        this.props.deleteLevel(tId);
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
      
    }

    handleDragOver = function(e) {

      // get the Level object to apply border
      let fTarget = e.target;
      if (!fTarget.classList.contains('Level')) {
        fTarget = fTarget.parentNode;
      }

      if (fTarget.classList.contains('Level')) {
        if (fTarget.style.borderBottom !== '8px solid rgba(240, 245, 250, 0.8)') {
          fTarget.style.borderBottom = '8px solid rgba(240, 245, 250, 0.8)';
        }  
      }

    }

    handleDragLeave = function(e) {
      
      // get the Level object to apply border
      let fTarget = e.target;
      if (!fTarget.classList.contains('Level')) {
        fTarget = fTarget.parentNode;
      }

      if (fTarget.classList.contains('Level')) {
        if (fTarget === e.target ||
          e.target.classList.contains('loadSign') ||
          e.target.classList.contains('deleteSign')) {
          
          // remove any borders from Level divs
          const lvls = document.querySelectorAll('.Level');
          lvls.forEach(lvl => {
            lvl.style.borderBottom = "none";
          });
        }
      }
    }

    startAnimation() {
      console.log('startAnimation');
      this.setState({ 
        swapped: false});
    }

    endAnimation() {
      this.props.resetSwapAnimation();
    }
    
    render() {
        const swappedVal = this.state.swapped;
        return (
          <CSSTransition
            in={swappedVal === true}
            timeout={Constants.getSwapAnimationDelay()}
            classNames="Level"
            onEnter={() => {this.startAnimation()}}
            onExit={() => {this.endAnimation()}}
          >
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
          </CSSTransition>
        );
    };
};

export default Level;