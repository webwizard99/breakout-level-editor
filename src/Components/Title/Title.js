import React from 'react';
import { connect } from 'react-redux';
import { CHANGE_TITLE,
  SET_HAS_CHANGES } from '../../actions/types';
import { titleDispatch } from '../../actions';

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
        
        // filter out non alphanumeric values
        const lastLetter = e.target.value[e.target.value.length - 1].charCodeAt(0);
        if ((lastLetter >= 48 && lastLetter <=57) ||
          (lastLetter >= 65 && lastLetter <= 90) ||
          (lastLetter >= 97 && lastLetter <= 122)) {
          
        } else {
          return;
        }
        this.props.changeTitle(e.target.value);
        this.props.setHasChanges(true);
    }

    handleMouseLeave() {
      document.activeElement.blur();
    }
    
    render() {
        return (
            <div className="Title">
                <input className="Title-text"
                    onMouseLeave={this.handleMouseLeave}
                    onChange={this.handleTitleChange}
                    placeholder={this.props.titleFail ? "must name level!" : "New Level"}
                    spellCheck="false"
                    value={this.props.title}
                    />
                
                    
            </div>
        );
    }
};

const mapStateToProps = state => {
  return {
    title: state.title.title,
    titleFail: state.appState.titleFail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeTitle: (title) => dispatch({type: CHANGE_TITLE, title: title}),
    setHasChanges: (value) => dispatch({type: SET_HAS_CHANGES, value: value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Title);