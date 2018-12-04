import React from 'react';
import './App.css';
import MenuBar from '../MenuBar/MenuBar';
import LevelView from '../LevelView/LevelView';
import LevelList from '../LevelList/LevelList';

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
          }
      }
      this.setCurrentBlock = this.setCurrentBlock.bind(this);
      
  }

  blocksAvailable = [{
        type: 'basic',
        color: `rgb(80, 100, 140)`,
        hp: 5
    },
    {
        type: 'basic',
        color: `rgb(140, 90, 100)`,
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

  
  
  render() {
    return (
      <div className="App">
        <MenuBar 
            title={this.state.currentLevel.title}
            block={this.state.currentBlock}
            blocksAvailable={this.blocksAvailable}
            blockIndex={this.state.currentBlockIndex}
            onChangeBlock={this.setCurrentBlock}
        />
        <div className="ViewColumn">
            <LevelView 
                setBlock={this.setViewBlock}
                block={this.state.currentBlock}
            />
            <LevelList />
        </div>
      </div>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById('App'));

export default App;

