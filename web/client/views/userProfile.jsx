import React from 'react';
import { connect } from 'react-redux';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import ConfirmDialog from '../components/confirm';
import {updateProfile,resetPassword} from '../actions/user';
import {toast} from '../actions/toast';

let UserProfile = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState() {        
        return {
            first: this.props.first,
            last: this.props.last,
            email: this.props.email,
            showReset: false,
            errors: {}
        };
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
        this.props.updateProfile({userid: this.props.userid, firstname: this.state.first, lastname: this.state.last, email: this.state.email})
        .then(() => {
            this.context.router.goBack();
        })
        .catch((err) => {
            this.props.toast(err.message || err);
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
                        <ToolbarGroup firstChild={true}>
                             <ToolbarTitle text={'Profile'}/>
                        </ToolbarGroup>
                        <ToolbarGroup lastChild={true}>
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
                        this.props.resetPassword({userid: this.props.userid}, currentpwd, newpwd, confirmpwd)
                        .then(() => {
                            this.setState({showReset: false, errors: {}});
                            this.props.toast('Password Changed');
                        })
                        .catch((err) => {
                            this.props.toast('Password Change Failed'/*err.message || err*/)(dispatch);
                        });
                    }}
                    onCancel={() => {
                        this.setState({showReset: false, errors: {}});
                    }}
                />
            </Paper>
        );
    }
});

const mapStateToProps = (state) => ({
    userid: state.user.userid,
    first: state.user.firstname,
    last: state.user.lastname,
    email: state.user.email
});

module.exports = connect(
  mapStateToProps,
  {updateProfile,resetPassword,toast}
)(UserProfile);
