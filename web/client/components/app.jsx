import React from 'react';
import { Link, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import FontAwesome from 'react-fontawesome';
import auth from '../services/auth';
import gravatar from '../services/gravatar';
import muiTheme from '../services/muitheme';

//let ThemeManager = mui.Styles.ThemeManager;
let App = React.createClass({
    mixins: [ browserHistory ],

    getInitialState() {
        return {
            loggedIn: auth.loggedIn(),
            user: auth.getUser().user
        };
    },

    updateAuth(loggedIn, user) {
        this.setState({
            loggedIn: loggedIn,
            user: user ? user.user : null
        });
    },

    componentWillMount() {
        auth.onChange = this.updateAuth;
    },
    componentWillUnmount() {
        auth.onChange = () => {}
    },
    componentDidMount() {
        let self = this;
        //* for dev purposes only
        if (!this.state.loggedIn) {
            auth.login('jdoe', 'go')
            .catch(function(err) {
                let msg = 'Logon Error: ' + (err.message || err);
                self.setState({statusMessage: msg});
                console.error(msg, err);
            });
        }
        //*/
    },

    handleToggle() {
        this.setState({open: !this.state.open});
    },

    handleClose() {
        this.setState({open: false});
    },

    handleMenu(route) {
        return (e,idx) => {
            this.handleClose();
            this.history.replaceState(null, route);
        }
    },

    handleSignIn() {
        this.history.replaceState(null, '/login');
    },

    menuAppBar() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <AppBar title="APS" onLeftIconButtonTouchTap={this.handleClose} onTitleTouchTap={this.handleClose}/>
            </MuiThemeProvider>
        );
    },

    render() {
        //console.log(this.state.user.username);
        //console.log(JSON.stringify(this.state.user));
        var profileuri = this.state.loggedIn ? gravatar(this.state.user) : '';

        return (
            <div>
                <header>
                  <MuiThemeProvider muiTheme={muiTheme}>
                      <AppBar title='APS'
                        onTitleTouchTap={this.handleToggle}
                        onLeftIconButtonTouchTap={this.handleToggle}
                        iconElementRight={
                            this.state.loggedIn ? (
                                <IconMenu
                                    iconButtonElement={
                                        <IconButton
                                            tooltip={this.state.user.firstname}
                                            tooltipPosition='bottom-left'
                                        >
                                            <Avatar src={profileuri} />
                                        </IconButton>
                                    }
                                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                >
                                    <MenuItem onTouchTap={this.handleMenu('/userprofile')} leftIcon={<FontIcon className="fa fa-user"/>}>Profile</MenuItem>
                                    <Divider />
                                    <MenuItem onTouchTap={this.handleMenu('/logout')} leftIcon={<FontIcon className="fa fa-sign-out"/>}>Sign Out</MenuItem>
                                </IconMenu>
                            ) : (
                                <IconButton
                                    tooltip='Sign In'
                                    tooltipPosition='bottom-left'
                                    iconClassName='fa fa-user'
                                    onTouchTap={this.handleSignIn}
                                    />
                            )
                        }>
                          {!this.state.loggedIn ? (
                              <Drawer
                                  docked={false}
                                  open={this.state.open}
                              >
                                {this.menuAppBar()}
                                <MenuItem onTouchTap={this.handleMenu('login')}>Sign In</MenuItem>
                              </Drawer>
                          ) : (
                              <Drawer
                                  docked={false}
                                  open={this.state.open}
                              >
                                  {this.menuAppBar()}
                                  <MenuItem onTouchTap={this.handleMenu('/')} leftIcon={<FontIcon className="fa fa-home"/>}>Home</MenuItem>
                                  <Divider />
                                  <MenuItem onTouchTap={this.handleMenu('/reports')} leftIcon={<FontIcon className="fa fa-list"/>}>Reports</MenuItem>
                                  <Divider />
                                  <MenuItem onTouchTap={this.handleMenu('/users')} leftIcon={<FontIcon className="fa fa-users"/>}>Users</MenuItem>
                                  <Divider />
                                  <MenuItem onTouchTap={this.handleMenu('/userprofile')} leftIcon={<FontIcon className="fa fa-user"/>}>Profile</MenuItem>
                                  <MenuItem onTouchTap={this.handleMenu('/about')} leftIcon={<FontIcon className="fa fa-question-circle"/>}>About</MenuItem>
                                  <Divider />
                                  <MenuItem onTouchTap={this.handleMenu('/logout')} leftIcon={<FontIcon className="fa fa-sign-out"/>}>Sign Out</MenuItem>
                              </Drawer>
                          )}

                      </AppBar>
                  </MuiThemeProvider>
                </header>

                <section className="content">
                  {this.props.children}
                </section>
            </div>
        );
    }
});

module.exports = App;
