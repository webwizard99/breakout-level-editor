import React from 'react';
import { connect } from 'react-redux';
import './TypePicker.css';

import { CHANGE_PALETTE_BLOCK } from '../../actions/types';

const possibleTypes = ['basic', 'strong', 'healer'];

class TypePicker extends React.Component {

  constructor(props) {
    super(props);

    this.getTypeOptions = this.getTypeOptions.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  getTypeOptions() {
    return (
      possibleTypes.map((type, n) => {
        return (<option value={type} key={n}>{type}</option>)
      })
    )
  }

  handleTypeChange(e) {
    const updatedBlock = JSON.parse(JSON.stringify(this.props.canvasBlock));
    updatedBlock.type = e.target.value;
    this.props.setPaletteBlock(updatedBlock);
  }

  render() {
    const currentType = this.props.canvasBlock.type;
    return (
      <div className="TypePicker">
        <label className="type-label" htmlFor="type-select">Type</label>
        <select id="type-select"
          value={currentType}
          onChange={this.handleTypeChange}>
          {this.getTypeOptions()}
        </select>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    canvasBlock: state.palette.blocks[state.palette.currentIndex]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPaletteBlock: (block) => dispatch({type: CHANGE_PALETTE_BLOCK, block: block})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TypePicker);