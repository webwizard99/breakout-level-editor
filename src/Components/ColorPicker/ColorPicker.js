import React from 'react';
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

export default CustomPicker(ColorPicker);