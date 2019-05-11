import React from 'react';
import './Level.css';

class DummyLevel extends React.Component {
  render() {
    return (<div className="Level DummyLevel"
      draggable="true"
      style={{borderBottom: "none"}}
      >
                
        <span className="levelListNumber">{this.props.num + 1}</span>
        <p>{this.props.name}</p>
        <span className="loadSign"
        >LOAD</span>
        <span className="deleteSign"
        >X</span>
        <div className="sortColumn">
          <p className="sortUp"
            >&#x25B2;</p>
          <p className="sortDown"
            >&#x25BC;</p>
        </div>
        
    </div>)
  }
}

export default DummyLevel;