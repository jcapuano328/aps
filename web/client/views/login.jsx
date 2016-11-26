import React from 'react';
import { connect } from 'react-redux';
import { Paper, TextField, RaisedButton } from 'material-ui';
import {login} from '../actions/auth';

let Login = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            user: '',
            password: ''
        }
    },
    componentDidMount() {
        if (this.refs.user) {
            this.refs.user.focus();
        }
    },
    onSubmit(e) {
        let self = this;
        e.preventDefault();
        let user = this.refs.user.getValue();
        let pass = this.refs.pass.getValue();

        this.props.login(user, pass);
    },
    render() {
        if (this.props.loggedin) {
            this.context.router.replace('/');
            return (<div/>)
        }

        return (
            <Paper
                style={{
                    width: 380,
                    height: '50%',
                    margin: '4em auto'
                }}
                zDepth={3}
            >
                <form onSubmit={this.onSubmit}
                    style={{
                        textAlign: 'center'
                    }}>
                    <div>
                        <TextField
                          ref="user"
                          hintText="Enter Username"
                          floatingLabelText="Username"
                          type="text" />
                    </div>

                    <div>
                        <TextField
                          ref="pass"
                          hintText="Enter Password"
                          floatingLabelText="Password"
                          type="password" />
                    </div>
                    <div
                        style={{
                            marginTop: 25,
                            marginBottom: 25
                        }}
                    >
                        <RaisedButton type='submit' label="Sign In" primary={true} />
                    </div>
                </form>
            </Paper>
        );
    }
});

const mapStateToProps = (state) => ({
    loggedin: state.user.loggedin
});

module.exports = connect(
  mapStateToProps,
  {login}
)(Login);
