import React from 'react';
import DialogBox from '../DialogBox/DialogBox';
import './DialogLayer.css';


class DialogLayer extends React.Component {
    
    render() {
        return (
            <div className="dialogLayer"
                
                style={{visibility: this.props.vis}}
                >
                <DialogBox pointer={this.props.pointer}
                    dialogMessage={this.props.dialogMessage}
                    processDialog={this.props.processDialog}
                />
            </div>
        )
    }
}

export default DialogLayer;