import React from 'react';
import { connect } from 'react-redux';
import Welcome from './welcome';
import Grosses from './Grosses';

let Home = React.createClass({
    render() {
        if (this.props.loggedin) {
            //return <div>Home again, Home again, jiggidy-jig. Good evening {this.props.firstname}!</div>;
            return <Grosses />;
        }
        return <Welcome />;
    }
});

const mapStateToProps = (state) => ({
    loggedin: state.user.loggedin,
    firstname: state.user.firstname
});

module.exports = connect(
  mapStateToProps
)(Home);
