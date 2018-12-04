import React from 'react';
import './Title.css';

class Title extends React.Component {

    render() {
        return (
            <div className="Title">
                <h2 className="Title-text">{this.props.title}</h2>
            </div>
        );
    }
};

export default Title;