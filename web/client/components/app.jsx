import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import FontAwesome from 'react-fontawesome';
import Alert from './alert';
import gravatar from '../services/gravatar';

let App = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            open: false
        };
    },

    onToggleMenu() {
        this.setState({open: !this.state.open});
    },
    onCloseMenu() {
        this.setState({open: false});
    },
    onSelectMenu(route) {
        return (e,idx) => {
            this.onCloseMenu();
            this.context.router.push(route);
        }
    },
    onSignIn() {
        this.context.router.replace('/login');
    },
    render() {
        var profileuri = this.props.loggedin ? gravatar(this.props.email) : '';

        return (
            <div>
                <header>
                      <AppBar title='APS'
                        onTitleTouchTap={this.onToggleMenu}
                        onLeftIconButtonTouchTap={this.onToggleMenu}
                        iconElementRight={
                            this.props.loggedin ? (
                                <IconMenu
                                    iconButtonElement={
                                        <IconButton
                                            tooltip={this.props.firstname}
                                            tooltipPosition='bottom-left'
                                        >
                                            <Avatar src={profileuri} />
                                        </IconButton>
                                    }
                                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                >
                                    <MenuItem onTouchTap={this.onSelectMenu('/userprofile')} leftIcon={<FontIcon className="fa fa-user"/>}>Profile</MenuItem>
                                    <Divider />
                                    <MenuItem onTouchTap={this.onSelectMenu('/logout')} leftIcon={<FontIcon className="fa fa-sign-out"/>}>Sign Out</MenuItem>
                                </IconMenu>
                            ) : (
                                <IconButton
                                    tooltip='Sign In'
                                    tooltipPosition='bottom-left'
                                    iconClassName='fa fa-user'
                                    onTouchTap={this.onSignIn}
                                    />
                            )
                        }>
                          {!this.props.loggedin ? (
                              <Drawer
                                  docked={false}
                                  open={this.state.open}
                              >
                                {this.renderAppBar()}
                                <MenuItem onTouchTap={this.onSelectMenu('login')}>Sign In</MenuItem>
                              </Drawer>
                          ) : (
                              <Drawer
                                  docked={false}
                                  open={this.state.open}
                              >
                                  {this.renderAppBar()}
                                  <MenuItem onTouchTap={this.onSelectMenu('/')} leftIcon={<FontIcon className="fa fa-home"/>}>Home</MenuItem>
                                  <Divider />
                                  <MenuItem onTouchTap={this.onSelectMenu('/reports')} leftIcon={<FontIcon className="fa fa-list"/>}>Reports</MenuItem>
                                  <Divider />
                                  <MenuItem onTouchTap={this.onSelectMenu('/users')} leftIcon={<FontIcon className="fa fa-users"/>}>Users</MenuItem>
                                  <Divider />
                                  <MenuItem onTouchTap={this.onSelectMenu('/userprofile')} leftIcon={<FontIcon className="fa fa-user"/>}>Profile</MenuItem>
                                  <MenuItem onTouchTap={this.onSelectMenu('/about')} leftIcon={<FontIcon className="fa fa-question-circle"/>}>About</MenuItem>
                                  <Divider />
                                  <MenuItem onTouchTap={this.onSelectMenu('/logout')} leftIcon={<FontIcon className="fa fa-sign-out"/>}>Sign Out</MenuItem>
                              </Drawer>
                          )}
                      </AppBar>
                </header>

                <section className="content">
                  {this.props.children}
                </section>
                <footer>
                    <Alert />
                </footer>
            </div>
        );
    },
    renderAppBar() {
        return (
            <AppBar title="APS" onLeftIconButtonTouchTap={this.onCloseMenu} onTitleTouchTap={this.onCloseMenu}/>
        );
    }
});

const mapStateToProps = (state) => ({
    loggedin: state.user.loggedin,
    firstname: state.user.firstname,
    email: state.user.email
});


module.exports = connect(
  mapStateToProps
)(App);
