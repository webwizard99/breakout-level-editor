import React from 'react';
import './Title.css';

class Title extends React.Component {

    constructor(props) {
        super(props);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        
    }

    ////**//**//**//**//**//**//
    // lifecycle Methods
    ///**//**//**//**//**//**///

    componentWillUpdate() {
        const tTitleText = document.querySelector('.Title-text');
        if (this.props.titleFail) {
            
            if (!tTitleText.classList.contains('error')) {
                tTitleText.classList.add('error');
            }
        } else {
            if (tTitleText.classList.contains('error')) {
                tTitleText.classList.remove('error');
            }
        }
    }

    ////**//**//**//**//**//**//
    ///**//**//**//**//**//**///
    ////**//**//**//**//**//**//

    handleTitleChange(e) {
        e.preventDefault();
        this.props.changeTitle(e.target.value);
    }
    
    render() {
        return (
            <div className="Title">
                <input className="Title-text"
                    onChange={this.handleTitleChange}
                    placeholder={this.props.titleFail ? "must name level!" : "New Level"}
                    spellCheck="false"
                    value={this.props.title}
                    />
                
                    
            </div>
        );
    }
};

export default Title;