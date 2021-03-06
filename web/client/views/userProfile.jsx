import React from 'react';
import { Paper, SelectField, MenuItem, TextField, RadioButtonGroup, RadioButton, Divider, IconButton, FontIcon, Snackbar,
         Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator } from 'material-ui';
import ConfirmDialog from '../components/confirm';
import auth from '../services/auth';
import userService from '../services/users';

let UserProfile = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            user: null,
            first: '',
            last: '',
            email: '',
            showReset: false,
            errors: {},
            statusMessage: '',
            statusMessageDuration: 5000
        };
    },

    componentWillMount() {
        let usr = auth.getUser().user;
        return userService.get(usr.userid)
        .then((user) => {
            this.setState({
                user: user,
                first: user.firstname,
                last: user.lastname,
                email: user.email,
                preferredAccount: user.preferredAccount,
                homeView: user.homeView || 'summary'
            });
        })
        .catch((err) => {
            this.setState({statusMessage: err.message || err});
            console.error(err);
        });
    },

    onChangeFirstName(e) {
        this.setState({first: e.target.value});
    },
    onChangeLastName(e) {
        this.setState({last: e.target.value});
    },
    onChangeEmail(e) {
        this.setState({email: e.target.value});
    },
    onResetPassword() {
        this.setState({showReset: true});
    },
    onOk(e) {
        // call the service to save the data
        this.state.user.firstname = this.state.first;
        this.state.user.lastname = this.state.last;
        this.state.user.email = this.state.email;

        userService.save(this.state.user)
        .then(() => {
            this.context.router.goBack();
        })
        .catch((err) => {
            console.error(err);
            this.setState({statusMessage: err.message || err});
            //this.context.router.goBack();
        });
    },
    onCancel(e) {
        this.context.router.goBack();
    },

    render() {
        return (
            <Paper
                style={{
                    width: '50%',
                    height: '100%',
                    margin: '1.5em auto'
                }}
                zDepth={2}
            >
                <form>
                    <Toolbar>
                        <ToolbarGroup float="left">
                             <ToolbarTitle text={'Profile'}/>
                        </ToolbarGroup>
                        <ToolbarGroup float="right">
                            <IconButton
                                tooltip='Accept'
                                tooltipPosition='top-left'
                                iconClassName='fa fa-check'
                                onTouchTap={this.onOk}
                            />
                            <IconButton
                                tooltip='Discard'
                                tooltipPosition='top-left'
                                iconClassName='fa fa-times'
                                onTouchTap={this.onCancel}
                            />
                            <ToolbarSeparator />
                        </ToolbarGroup>
                        <ToolbarGroup float="right">
                            <IconButton
                                tooltip='Reset Password'
                                tooltipPosition='top-left'
                                iconClassName='fa fa-lock'
                                onTouchTap={this.onResetPassword}
                            />
                        </ToolbarGroup>

                    </Toolbar>
                    <div style={{textAlign: 'center'}}>
                        <div>
                            <TextField value={this.state.first}
                                onChange={this.onChangeFirstName}
                                floatingLabelText="First Name"
                                hintText='User First Name'/>
                        </div>
                        <div>
                            <TextField value={this.state.last}
                                onChange={this.onChangeLastName}
                                floatingLabelText="Last Name"
                                hintText='User Last Name'/>
                        </div>
                        <div>
                            <TextField value={this.state.email}
                                type="Email"
                                onChange={this.onChangeEmail}
                                floatingLabelText="Email Address"
                                hintText='User Email Address'/>
                        </div>
                    </div>
                    <Snackbar
                      open={!!this.state.statusMessage}
                      message={this.state.statusMessage}
                      autoHideDuration={this.state.statusMessageDuration}
                      onRequestClose={() => {
                          this.setState({statusMessage: ''});
                      }}
                    />
                </form>
                <ConfirmDialog ref="resetDlg" open={this.state.showReset}
                    title='Reset Password'
                    prompt={(
                        <div style={{textAlign: 'center'}}>
                            <TextField
                                ref='currentpwd'
                                floatingLabelText='Current Password'
                                hintText='Enter Current Password'
                                errorText={this.state.errors.currentpwd}
                                type='password'/>
                            <br/>
                            <TextField
                                ref='newpwd'
                                floatingLabelText='New Password'
                                hintText='Enter New Password'
                                errorText={this.state.errors.newpwd}
                                type='password'/>
                            <br/>
                            <TextField
                                ref='confirmpwd'
                                floatingLabelText='Confirm Password'
                                hintText='Confirm New Password'
                                errorText={this.state.errors.confirmpwd}
                                type='password'/>
                        </div>
                    )}
                    onOk={() => {
                        let currentpwd = this.refs.currentpwd.getValue();
                        let newpwd = this.refs.newpwd.getValue();
                        let confirmpwd = this.refs.confirmpwd.getValue();
                        let errors = {
                            currentpwd: (!currentpwd ? 'Current Password is Required' : ''),
                            newpwd: (!newpwd ? 'New Password is Required' : ''),
                            confirmpwd: (!confirmpwd ? 'Confirm Password is Required' : (newpwd !== confirmpwd ? 'Confirm Password must match New Password' : ''))
                        };
                        if (!currentpwd || !newpwd || !confirmpwd || newpwd !== confirmpwd) {
                            this.setState({errors: errors});
                            return;
                        }
                        userService.resetPassword(this.state.user, currentpwd, newpwd, confirmpwd)
                        .then(() => {
                            this.setState({statusMessage: 'Password Changed', showReset: false, errors: {}});
                        })
                        .catch((err) => {
                            this.setState({statusMessage: 'Password Change Failed'});//err.message || err});
                            console.error(err);
                        });
                    }}
                    onCancel={() => {
                        this.setState({showReset: false, errors: {}, statusMessage: ''});
                    }}
                />
            </Paper>
        );
    }
});

module.exports = UserProfile;
