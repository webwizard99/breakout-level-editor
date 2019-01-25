import React from 'react';
import './LevelListTitle.css';

class LevelListTitle extends React.Component {
  render() {
    return (
      <div className="LevelListTitle">
        <h2 className="ListTitle">{this.props.listName}</h2>
        <span className="HighScoreLabel">High Score:</span>
        <span className="HighScore">{this.props.highScore}</span>

      </div>
    )
  }
}

export default LevelListTitle;