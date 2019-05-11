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
      const reactPos = ReactPos.getCurrentDragPos();
      const loc = {
        x: reactPos.x,
        y: reactPos.y
      };
      const tSector = this.sectorize(fTarget, loc);
      
      if (this.props.num > 0) {
        this.props.setDragTarget({ele: this.props.lvlId, num: this.props.num});
        this.props.setDirection(tSector);
      }
      
      // if (fTarget.classList.contains('Level')) {
      //   if (fTarget.style.borderBottom !== '8px solid rgba(240, 245, 250, 0.8)') {
      //     fTarget.style.borderBottom = '8px solid rgba(240, 245, 250, 0.8)';
      //   }  
      // }

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

    sectorize(element, coords) {
      const eleRect = element.getBoundingClientRect();
      const yOffset = coords.y - eleRect.y;
      const yTotal = eleRect.height;
      let sectorResponse = '';
      const margins = 0.48;
      if (yOffset / yTotal < margins) {
        sectorResponse = 'top';
      } else if (yOffset / yTotal > 1 - margins) {
        sectorResponse = 'bottom';
      } else {
        sectorResponse = 'middle';
      }

      return sectorResponse;
    }

    startAnimation() {
      console.log('startAnimation');
      this.setState({ 
        swapped: false});
    }

    endAnimation() {
      this.props.resetSwapAnimation();
      this.setState({ 
        swapped: false});
    }
    
    render() {
        const swappedVal = this.state.swapped;
        let opacityStyling = '';
        if (this.props.beingDragged) {
          opacityStyling = '.4';
        } else {
          opacityStyling = '1';
        }
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
              style={{ opacity: opacityStyling}}
              onDragEnd={this.handleDragEnd}
              onDragOver={this.handleDragOver}
              onDragLeave={this.handleDragLeave}
              onDragStart={(e) => {
                e.dataTransfer.setData('text',''); 
                this.props.setDragEle({
                  num: this.props.num - 1,
                  name: this.props.name,
                  id: this.props.lvlId });
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