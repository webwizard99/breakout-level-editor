import React from 'react';
import './DialogBox.css';
import InputController from '../../Utils/InputController';

class DialogBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleYes = this.handleYes.bind(this);
        this.handleNo = this.handleNo.bind(this);
    }

    handleYes(e) {
        e.preventDefault();
        InputController.setDialogYes(true);
        this.props.processRequest();
    }

    handleNo(e) {
        e.preventDefault();
        InputController.setDialogNo(true);
        this.props.denyRequest();
    }
    
    render() {
        return (
            <div className="dialogBox"
                  pointer="none">
                <div className="dialogHead">
                  <span>Please Confirm</span>
                </div>
                <div className="dialogMessage">
                    {this.props.dialogMessage}
                </div>
                <div className="dialogResponse">
                    <input type="button" 
                        className="dialogYes"
                        pointer="all"
                        value="Yes"
                        onClick={this.handleYes}
                    />
                    <input type="button"
                        className="dialogNo"
                        ponter="all"
                        value="No"
                        onClick={this.handleNo}
                    />
                </div>
            </div>
        )
    }
}

export default DialogBox;