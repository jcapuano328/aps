import React from 'react';
import { connect } from 'react-redux';
import {logout} from '../actions/auth';

let Logout = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    render() {
        if (!this.props.loggedin) {
            this.context.router.replace('/');
            return <p>You are now logged out</p>
        }
        this.props.logout();
        return <div>Logging off...</div>
    }
});

const mapStateToProps = (state) => ({
    loggedin: state.user.loggedin
});

module.exports = connect(
  mapStateToProps,
  {logout}
)(Logout);
