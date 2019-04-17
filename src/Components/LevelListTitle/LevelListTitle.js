import React from 'react';
import './LevelListTitle.css';
import LevelSelector from '../LevelSelector/LevelSelector';

class LevelListTitle extends React.Component {
  render() {
    return (
      <div className="LevelListTitle">
        <h2 className="ListTitle">{this.props.listName}</h2>
        <span className="HighScoreLabel">High Score:</span>
        <span className="HighScore">{this.props.highScore}</span>
        <LevelSelector/>
      </div>
    )
  }
}

export default LevelListTitle;