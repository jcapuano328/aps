import React from 'react';
import { Link, History } from 'react-router';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle, DropDownMenu, MenuItem, IconButton, Snackbar } from 'material-ui';
import {FormattedNumber} from 'react-intl';
import auth from '../services/auth';
import _ from 'lodash';

let Home = React.createClass({
    mixins: [ History ],

    getInitialState() {
        return {
            loggedIn: auth.loggedIn(),
            grosses: [],
            range: 6,
            rangeUnit: 'months',
            statusMessage: '',
            statusMessageDuration: 5000
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

    onChangeRange(e,i,v) {
        console.log('range ' + v);
        this.setState({range: +v}, () => {
            this.onRefresh();
        });
    },
    onChangeRangeUnit(e,i,v) {
        console.log('range unit ' + v);
        this.setState({rangeUnit: v}, () => {
            this.onRefresh();
        });
    },
    onRefresh() {
        // retrieve data
        /*
        let range = daterange(this.state.range, this.state.rangeUnit);
        console.log('fetch transactions for ' + acct.accountid);
        return transService.summary(acct.accountid, range.start, range.end, 'category')
        .then((data) => {
            console.log('Retrieved ' + data.transactions.length + ' transactions');
            this.setState({transactionSummary: data});
        })
        .catch((err) => {
            this.setState({statusMessage: err.message || err});
            console.error(err);
        });

        */
    },
    welcomeView() {
        return (
            <div>
                <h1>Welcome!</h1>
                <p>
                    Please <Link to="/login">Sign in</Link> or <Link to="/signup">Sign up</Link> to get started!
                </p>
            </div>
        );
    },
    homeView() {
        return (
            <div>
                <Toolbar>
                    <ToolbarGroup float="left">
                         <ToolbarTitle text={'Daily Grosses'} />
                    </ToolbarGroup>
                    <ToolbarGroup float="left" style={{top: '32%', left: '30%'}}>
                        <label><i>For the week of ...</i></label>
                    </ToolbarGroup>
                    <ToolbarGroup float="right">
                        <ToolbarTitle text="Last" />
                        <DropDownMenu value={this.state.range}
                            onChange={this.onChangeRange}
                            floatingLabelText="Range"
                            hintText='Length of Range'>
                            {
                                _.range(12).map((i) => {
                                    let n = i+1;
                                    return (
                                        <MenuItem key={n} value={n} primaryText={n.toString()}/>
                                    );
                                })
                            }
                        </DropDownMenu>
                        <DropDownMenu value={this.state.rangeUnit}
                            onChange={this.onChangeRangeUnit}
                            floatingLabelText="Range Unit"
                            hintText='Range Unit'>
                            <MenuItem key={1} value={'weeks'} primaryText={'Weeks'}/>
                            <MenuItem key={2} value={'months'} primaryText={'Months'}/>
                            <MenuItem key={3} value={'years'} primaryText={'Years'}/>
                        </DropDownMenu>
                        <IconButton
                            tooltip='Refresh'
                            tooltipPosition='top-left'
                            iconClassName='fa fa-refresh'
                            onTouchTap={this.onRefresh}
                        />
                    </ToolbarGroup>
                </Toolbar>
                <section style={{float: 'left', width: '75%', height: '100%'}}>
                    <label>This is where the daily grosses view sits...</label>
                </section>
                <Snackbar
                  open={!!this.state.statusMessage}
                  message={this.state.statusMessage}
                  autoHideDuration={this.state.statusMessageDuration}
                  onRequestClose={() => {
                      this.setState({statusMessage: ''});
                  }}
                />
            </div>
        );
    },

    render() {
        if (this.state.loggedIn) {
            return this.homeView();
        }
        return this.welcomeView();
    }
});

module.exports = Home;
