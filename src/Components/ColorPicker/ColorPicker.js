import React from 'react';
import { connect } from 'react-redux';
import { CHANGE_PALETTE_BLOCK_COLOR, CHANGE_COLOR } from '../../actions/types';
import './ColorPicker.css';
import convert from 'color-convert';
import { CustomPicker } from 'react-color';
import { Saturation } from 'react-color/lib/components/common';
import { Hue } from 'react-color/lib/components/common';

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(color) {
    const rgbColor = convert.hsv.rgb(color.h, color.s, color.v);
    const rgbText = `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, 1)`;
    this.props.changeColor(rgbText);
    this.props.changePaletteBlockColor(rgbText);
    this.props.onChange(color);
  }

  render() {
    return (
      <div className="ColorPicker"
          >
        <div className="SaturationContainer">
          <Saturation {...this.props}
            onChange={this.handleChange}
          />
        </div>
        <div className="HueContainer">
          <Hue {...this.props}
            onChange={this.handleChange}
            direction="horizontal"
          />
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    color: state.color.color
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeColor: (color) => dispatch({type: CHANGE_COLOR, color: color }),
    changePaletteBlockColor: (color) => dispatch({type: CHANGE_PALETTE_BLOCK_COLOR, color: color })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPicker(ColorPicker));