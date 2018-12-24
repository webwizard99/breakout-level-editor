import React from 'react';
import './App.css';
import MenuBar from '../MenuBar/MenuBar';
import LevelView from '../LevelView/LevelView';
import LevelList from '../LevelList/LevelList';
import Levels from '../../Game/breakout/resources/js/utils/Levels';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          currentLevel: {
              title: 'New Level'
          },
          currentBlockIndex: 0,
          currentBlock: {
            type: 'basic',
            color: `rgb(80, 100, 140)`,
            hp: 5
          },
          blockMap: []
      }
      this.setCurrentBlock = this.setCurrentBlock.bind(this);
      this.setBlockMap = this.setBlockMap.bind(this);
      this.saveLevel = this.saveLevel.bind(this);
      this.getLevelForOutput = this.getLevelForOutput.bind(this);
      
  }

  blocksAvailable = [{
        type: 'basic',
        color: `rgba(80, 100, 140)`,
        hp: 5
    },
    {
        type: 'basic',
        color: `rgba(140, 90, 100)`,
        hp: 5
    }, 
    false
  ];

  setCurrentBlock(block, index) {
      if(block) {
          this.setState({
              currentBlock: block,
              currentBlockIndex: index
            });
      }
  }

  setBlockMap(map) {
    this.setState({
        blockMap: map
    });
    
  }

  saveLevel() {
    const levelDupe = this.getLevelForOutput();
    Levels.push(levelDupe);
    const el = document.createElement('textarea');
    el.value = JSON.stringify(levelDupe);
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    
  }

  getLevelForOutput() {
     const tBlockMap = this.state.blockMap;

     let outputBlockMap = [];
     tBlockMap.forEach((row, rowN) => {
        let tRow = [];
        row.map((col, colN) => {
            if (!col) {
                tRow.push(false);
                
            } else {
                const tBlock = col;
                const colorOut = tBlock.color
                    .replace('rgb', 'rgba')
                    .replace(')', ', %alpha)');
                tRow.push({
                    width: 1,
                    hp: tBlock.hp,
                    density: 1,
                    type: tBlock.type,
                    row: rowN,
                    col: colN,
                    color: colorOut
                    
                });
            }
        });
        outputBlockMap.push(tRow);
     });
    return outputBlockMap;
  }
  
  render() {
    return (
      <div className="App">
        <MenuBar 
            title={this.state.currentLevel.title}
            block={this.state.currentBlock}
            blocksAvailable={this.blocksAvailable}
            blockIndex={this.state.currentBlockIndex}
            onChangeBlock={this.setCurrentBlock}
            saveLevel={this.saveLevel}
        />
        <div className="ViewColumn">
            <LevelView 
                setBlock={this.setViewBlock}
                block={this.state.currentBlock}
                setBlockMap={this.setBlockMap}
                blockMap={this.state.blockMap}
            />
            <LevelList />
        </div>
      </div>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById('App'));

export default App;

