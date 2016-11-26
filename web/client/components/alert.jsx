import React from 'react';
import { connect } from 'react-redux';
import { Snackbar } from 'material-ui'
import {toast} from '../actions/toast';

let Alert = React.createClass({
    render() {
        return (
            <Snackbar
              open={this.props.active}
              message={this.props.message}
              autoHideDuration={this.props.duration}
              onRequestClose={() => {
                  toast('');
              }}
            />
        );
    }
});

const mapStateToProps = (state) => ({
    active: state.toast.active,
    message: state.toast.message,
    duration: state.toast.duration
});

module.exports = connect(
  mapStateToProps,
  { toast }  
)(Alert);
