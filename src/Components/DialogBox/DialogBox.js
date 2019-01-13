import React from 'react';
import './DialogBox.css';

class DialogBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleYes = this.handleYes.bind(this);
        this.handleNo = this.handleNo.bind(this);
    }

    handleYes(e) {
        e.preventDefault();
        this.props.processDialog(true);
    }

    handleNo(e) {
        e.preventDefault();
        this.props.processDialog(false);
    }
    
    render() {
        return (
            <div className="dialogBox">
                <div className="dialogHead">
                </div>
                <div className="dialogMessage">
                    {this.props.dialogMessage}
                </div>
                <div className="dialogResponse">
                    <input type="button" 
                        className="dialogYes" 
                        value="Yes"
                        onClick={this.handleYes}
                    />
                    <input type="button"
                        className="dialogNo"
                        value="No"
                        onClick={this.handleNo}
                    />
                </div>
            </div>
        )
    }
}

export default DialogBox;