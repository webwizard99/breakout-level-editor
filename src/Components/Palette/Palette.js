import React from 'react';
import PaletteBlock from '../PaletteBlock/PaletteBlock';
import './Palette.css';
import Constants from '../../Game/breakout/resources/js/utils/Constants.js';

const sizeFactor = 1.1;

class Palette extends React.Component {
  constructor(props) {
    super(props);

    this.getPaletteBlocks = this.getPaletteBlocks.bind(this);
  }

  getPaletteBlocks() {
    const numberOfBlocks = Constants.getPaletteBlocks();
    const tColor = "white";

    let paletteBlocksT = [];

    for (let i = 0; i < numberOfBlocks; i++) {
      paletteBlocksT.push(tColor);
    }

    console.log(paletteBlocksT);

    
    

    return (
      paletteBlocksT.map((block, n) => {
        return <PaletteBlock color={block}
          key={n}
          width={Constants.getCell().width * sizeFactor}
          height={Constants.getCell().height}
          />
      })
    )
  }
  
  render() {
    return (
      <div className="PaletteContainer">
        <div className="Palette"
          width={Constants.getCell().width * 4}
          height={Constants.getCell().height * 4}
        >
        {this.getPaletteBlocks()}
        </div>
      </div>
    );
  }
}

export default Palette;