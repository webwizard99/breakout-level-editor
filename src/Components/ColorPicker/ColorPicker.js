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
    this.handleHueChange = this.handleHueChange.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }
  
  handleChange(color) {
    const rgbColor = convert.hsv.rgb(color.h, color.s, color.v);
    const rgbText = `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, 1)`;
    this.props.changeColor(rgbText);
    this.props.changePaletteBlockColor(rgbText);
    this.props.onChange(color);
  }

  handleHueChange(color) {
    const colorSplit = (this.props.color).match(/(\d)+,\s*(\d)+,\s*(\d)+,\s*(\d)+/)[0]
      .split(',');
      
    const hslColor = convert.rgb.hsl(
      [colorSplit[0],
      colorSplit[1],
      colorSplit[2]]);
    
    const hslComposite = {h: color.h, s: hslColor[1], l: hslColor[2]};
    const rgbColor = convert.hsl.rgb(hslComposite.h, hslComposite.s, hslComposite.l);
    const rgbText = `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, 1)`;
    this.props.changeColor(rgbText);
    this.props.changePaletteBlockColor(rgbText);
    this.props.onChange(color);
  }

  handleMouseUp() {
    document.activeElement.blur();
  }

  render() {
    return (
      <div className="ColorPicker"
          color={this.props.color}>
        <div className="UIComponentsContainer">
          <div className="SaturationContainer">
            <Saturation {...this.props}
              onChange={this.handleChange}
              onMouseUp={this.handleMouseUp}
            />
          </div>
          <div className="HueContainer">
            <Hue {...this.props}
              onChange={this.handleHueChange}
              onMouseUp={this.handleMouseUp}
              direction="horizontal"
            />
          </div>
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