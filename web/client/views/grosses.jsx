import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import DailyGrosses from './grossesDaily';
import WeeklyGrosses from './grossesWeekly';
import auth from '../services/auth';
import muiTheme from '../services/muitheme';

let units = [
    {value: 'day',description: 'Daily'},
    {value: 'week',description: 'Weekly'},
    {value: 'month',description: 'Monthly'},
    {value: 'year',description: 'Yearly'}
];

let Grosses = React.createClass({
    mixins: [ browserHistory ],

    getInitialState() {
        var dt = moment();
        dt.startOf(units[0].value);

        return {
            loggedIn: auth.loggedIn(),
            start: dt.toDate(),
            unit: units[0].value,
            refresh: true,
            statusMessage: '',
            statusMessageDuration: 5000
        };
    },
    componentDidMount() {
        this.onRefresh();
    },

    /*
    updateAuth(loggedIn, user) {
        this.setState({
            loggedIn: loggedIn,
            user: user
        });
    },
    */
    onChangeStart(e,v) {
        var dt = moment(v);
        dt.startOf(this.state.unit);
        this.setState({start: dt.toDate()}, () => {
            this.onRefresh();
        });
    },
    onChangeUnit(e,i,v) {
        this.setState({unit: v}, () => {
            this.onRefresh();
        });
    },
    onCurrentPeriod() {
        var dt = moment();
        dt.startOf(this.state.unit);
        this.setState({start: dt.toDate()}, () => {
            this.onRefresh();
        });
    },
    onPrevPeriod() {
        var dt = this.changeStart(-1);
        this.setState({start: dt});
    },
    onNextPeriod() {
        var dt = this.changeStart(1);
        this.setState({start: dt});
    },
    onRefresh() {
        this.setState({refresh: !this.state.refresh});
    },
    render() {
        console.log('render grosses');
        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Toolbar>
                        <ToolbarGroup firstChild={true}>
                            <ToolbarTitle text={'Grosses'} />
                            <DropDownMenu value={this.state.unit} onChange={this.onChangeUnit}>
                                {units.map((unit, i) => <MenuItem key={i} value={unit.value} primaryText={unit.description}/>)}
                            </DropDownMenu>
                            <IconButton
                                tooltip='Previous'
                                tooltipPosition='bottom-left'
                                iconClassName='fa fa-chevron-circle-left'
                                onTouchTap={this.onPrevPeriod}
                            />
                            <DatePicker hintText="Start Date" value={this.state.start} onChange={this.onChangeStart}
                                formatDate={this.formatDate}
                            />
                            <IconButton
                                tooltip='Next'
                                tooltipPosition='bottom-left'
                                iconClassName='fa fa-chevron-circle-right'
                                onTouchTap={this.onNextPeriod}
                            />
                            <IconButton
                                tooltip='Now'
                                tooltipPosition='bottom-left'
                                iconClassName='fa fa-asterisk'
                                onTouchTap={this.onCurrentPeriod}
                            />
                        </ToolbarGroup>
                        <ToolbarGroup lastChild={true}>
                            <IconButton
                                tooltip='Refresh'
                                tooltipPosition='bottom-left'
                                iconClassName='fa fa-refresh'
                                onTouchTap={this.onRefresh}
                            />
                        </ToolbarGroup>
                    </Toolbar>
                </MuiThemeProvider>
                <section style={{float: 'left', width: '75%', height: '100%'}}>
                    {this.renderGrosses()}
                </section>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Snackbar
                      open={!!this.state.statusMessage}
                      message={this.state.statusMessage}
                      autoHideDuration={this.state.statusMessageDuration}
                      onRequestClose={() => {
                          this.setState({statusMessage: ''});
                      }}
                    />
                </MuiThemeProvider>
            </div>
        );
    },
    formatDate(v) {
        var dt = moment(v);
        dt.startOf(this.state.unit);
        if (this.state.unit == 'day') {
            return 'For ' + dt.format('MMM Do, YYYY');
        }
        if (this.state.unit == 'week') {
            return 'For the week of ' + dt.format('MMM Do, YYYY');
        }
        if (this.state.unit == 'month') {
            return 'For the month of ' + dt.format('MMM YYYY');
        }
        if (this.state.unit == 'year') {
            return 'For the year of ' + dt.format('YYYY');
        }
    },
    changeStart(adj) {
        var dt = moment(this.state.start);
        dt.startOf(this.state.unit);
        let unit = 'd';
        switch (this.state.unit) {
            case 'day':
            unit = 'd';
            break;
            case 'week':
            unit = 'w'
            break;
            case 'month':
            unit = 'M'
            break;
            case 'year':
            unit = 'y'
            break;
        }
        dt.add(adj, unit);
        return dt.toDate();
    },
    renderGrosses() {
        if (this.state.unit == 'day') {
            return (
                <DailyGrosses start={this.state.start} unit={this.state.unit} />
            );
        }
        if (this.state.unit == 'week') {
            return (
                <WeeklyGrosses start={this.state.start} unit={this.state.unit} />
            );
        }
        if (this.state.unit == 'month') {
            return (
                <label>This is where the monthly grosses view sits...</label>
            );
        }
        if (this.state.unit == 'year') {
            return (
                <label>This is where the annual grosses view sits...</label>
            );
        }
    }
});

module.exports = Grosses;
