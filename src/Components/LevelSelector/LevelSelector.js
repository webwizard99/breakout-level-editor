import React from 'react';
import './LevelSelector.css';
import LevelStorage from '../../Utils/LevelStorage';

class LevelSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      records: []
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.getListOptions = this.getListOptions.bind(this);
  }

  componentDidMount() {
    this.setState({
      records: LevelStorage.getRecords()
    });
  }

  getListOptions() {
    if (this.state.records.length < 1) {
      return (
        <option>no levels</option>
      )
    } else {
      const recs = this.state.records;
      return (
        recs.map((record, n) => {
          return (<option value={record} key="n">{record}</option>)
        })
      )
    }
  }
  
  render() {
    return (
      <div className="LevelSelector">
        <select className="LevelListSelect">
          {this.getListOptions()}
        </select>
      </div>
    )
  }
}

export default LevelSelector;
