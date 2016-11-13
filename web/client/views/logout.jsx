import React from 'react';
import { browserHistory } from 'react-router'
import Auth from '../services/auth'

let Logout = React.createClass({
    mixins: [ browserHistory ],

    componentDidMount() {
        Auth.logout()
        .then(() => {
            this.history.replaceState(null, '/');
        });
    },

    render() {
        //return <p>You are now logged out</p>
        return <div>Logging off...</div>
    }
});

module.exports = Logout;
