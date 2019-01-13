import React from 'react';
import './Title.css';

class Title extends React.Component {

    constructor(props) {
        super(props);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    handleTitleChange(e) {
        e.preventDefault();
        this.props.changeTitle(e.target.value);
    }
    
    render() {
        return (
            <div className="Title">
                <input className="Title-text"
                    onChange={this.handleTitleChange}
                    placeholder="New Level"
                    spellCheck="false"
                    value={this.props.title}
                    />
                
                    
            </div>
        );
    }
};

export default Title;