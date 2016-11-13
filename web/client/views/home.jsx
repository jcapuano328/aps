import React from 'react';
import auth from '../services/auth';
import Welcome from './welcome';
import Grosses from './Grosses';

let Home = React.createClass({
    getInitialState() {
        return {
            loggedIn: auth.loggedIn()
        };
    },

    /*
    updateAuth(loggedIn, user) {
        this.setState({
            loggedIn: loggedIn,
            user: user
        });
    },
    */

    render() {
        if (this.state.loggedIn) {
            return <Grosses />;
        }
        return <Welcome />;
    }
});

module.exports = Home;
