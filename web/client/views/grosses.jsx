import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import {setStart,setNow,previousStart,nextStart,setUnit} from '../actions/filter';
import {reload} from '../actions/grosses';
import DailyGrosses from './grossesDaily';
import WeeklyGrosses from './grossesWeekly';

let Grosses = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentDidMount() {
        this.onRefresh();
    },
    onChangeStart(e,v) {
        this.props.setStart(v);
        this.onRefresh();
    },
    onChangeUnit(e,i,v) {
        this.props.setUnit(v);
        this.onRefresh();
    },
    onCurrentPeriod() {
        this.props.setNow();
        this.onRefresh();
    },
    onPrevPeriod() {
        this.props.previousStart();
        this.onRefresh();
    },
    onNextPeriod() {
        this.props.nextStart();
        this.onRefresh();
    },
    onRefresh() {
        this.props.reload();
    },
    render() {
        return (
            <div>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <ToolbarTitle text={'Grosses'} />
                        <DropDownMenu value={this.props.unit} onChange={this.onChangeUnit}>
                            {this.props.units.map((unit, i) => <MenuItem key={i} value={unit.value} primaryText={unit.description}/>)}
                        </DropDownMenu>
                        <IconButton
                            tooltip='Previous'
                            tooltipPosition='bottom-left'
                            iconClassName='fa fa-chevron-circle-left'
                            onTouchTap={this.onPrevPeriod}
                        />
                        <DatePicker hintText="Start Date" value={this.props.start} onChange={this.onChangeStart}
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
                <section style={{float: 'left', width: '75%', height: '100%'}}>
                    {this.renderGrosses()}
                </section>
            </div>
        );
    },
    formatDate(v) {
        var dt = moment(v);
        dt.startOf(this.props.unit);
        if (this.props.unit == 'day') {
            return 'For ' + dt.format('MMM Do, YYYY');
        }
        if (this.props.unit == 'week') {
            return 'For the week of ' + dt.format('MMM Do, YYYY');
        }
        if (this.props.unit == 'month') {
            return 'For the month of ' + dt.format('MMM YYYY');
        }
        if (this.props.unit == 'year') {
            return 'For the year of ' + dt.format('YYYY');
        }
    },
    renderGrosses() {
        if (this.props.unit == 'day') {
            return (<DailyGrosses />);
            //return (<label>This is where the daily grosses view sits...</label>);
        }
        if (this.props.unit == 'week') {
            return (<WeeklyGrosses />);
            //return (<label>This is where the weekly grosses view sits...</label>);
        }
        if (this.props.unit == 'month') {
            return (<label>This is where the monthly grosses view sits...</label>);
        }
        if (this.props.unit == 'year') {
            return (<label>This is where the annual grosses view sits...</label>);
        }
    }
});

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedin,
    start: state.filter.start,
    unit: state.filter.unit,
    units: state.filter.units
});

module.exports = connect(
  mapStateToProps,
  {setStart,setNow,previousStart,nextStart,setUnit,reload}
)(Grosses);
