import React from 'react';
import './LevelList.css';
import Level from '../Level/Level';

class LevelList extends React.Component {
    
    
    render() {
        return (
            <div className="LevelList">
                <Level />
                <Level />
                <Level />
                <Level />
                <Level />
                <Level />
                <Level />
                <Level />
                <Level />
                <Level />
                <Level />
            </div>
        );
    }
};

export default LevelList;