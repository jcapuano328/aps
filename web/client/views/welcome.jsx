import React from 'react';
import { Link } from 'react-router';

let Welcome = React.createClass({
    render() {
        return (
            <div>
                <h1>Welcome!</h1>
                <p>
                    Please <Link to="/login">Sign in</Link> to get started!
                </p>
            </div>
        );
    }
});

module.exports = Welcome;
