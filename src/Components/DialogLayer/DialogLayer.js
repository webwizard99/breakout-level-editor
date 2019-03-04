import React from 'react';
import { connect } from 'react-redux';
import DialogBox from '../DialogBox/DialogBox';
import InputController from '../../Utils/InputController';
import './DialogLayer.css';
import { DEACTIVATE_DIALOG_BOX,
  SET_DIALOG_RESPONDED,
  SET_HAS_CHANGES } from '../../actions/types';

class DialogLayer extends React.Component {
    constructor(props){
      super(props);

      this.componentDidUpdate = this.componentDidUpdate.bind(this);
      this.processRequest = this.processRequest.bind(this);
      this.denyRequest = this.denyRequest.bind(this);
    }

    componentDidUpdate(prevProps) {
      // no code?
    }

    processRequest() {
      this.props.setDialogResponded();
      this.props.setHasChanges(false);
      this.props.deactivateDialog();
    }

    denyRequest() {
      this.props.setDialogResponded();
      this.props.deactivateDialog();
    }

    render() {
        return (
            <div className="dialogLayer"
                onClick={this.denyRequest}
                style={{visibility: this.props.dialogEnabled ? 'visible' : 'hidden'}}
                >
                <DialogBox pointer={this.props.dialogPointer ? 'all' : 'none'}
                    dialogMessage={this.props.dialogText}
                    processDialog={this.props.processDialog}
                    processRequest={this.processRequest}
                    denyRequest={this.denyRequest}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    dialogPointer: state.appState.dialogPointer,
    dialogEnabled: state.appState.dialogEnabled,
    dialogText: state.dialog.dialogText
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deactivateDialog: () => dispatch({ type: DEACTIVATE_DIALOG_BOX }),
    setDialogResponded: () => dispatch({ type: SET_DIALOG_RESPONDED }),
    setHasChanges: (val) => dispatch({ type: SET_HAS_CHANGES, hasChanges: val })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogLayer);