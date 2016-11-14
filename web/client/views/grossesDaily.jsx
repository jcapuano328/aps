import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Snackbar from 'material-ui/Snackbar';
import {FormattedNumber} from 'react-intl';
import NumberInput from 'material-ui-number-input';
import muiTheme from '../services/muitheme';
import {groupByPerson} from '../services/grosses';

/*

        Header
        Employee
            name    mon tue wed thru fri sat gross rent net
        Footer
                                             total total total
*/


/*
    Name      Mon     Tue     Wed     Thu     Fri     Sat     Gross   Rent    Net

 */
 let Header = React.createClass({
     render() {
         let dt = moment(this.props.start);
         return (
            <div style={{width: "100%"}}>
                <label style={{float: 'left'}}>Name</label>
                {_.range(6).map((n) => {
                    dt.add(1,'d');
                    let dow = dt.format('ddd');
                    let md = dt.format('MM/DD');
                    return (
                        <label key={n} style={{float: 'left'}}>
                            <p>{dow}</p>
                            <p>{md}</p>
                        </label>
                    );
                })}
                <label style={{float: 'left'}}>Gross</label>
                <label style={{float: 'left'}}>Rent</label>
                <label style={{float: 'left'}}>Net</label>
            </div>
         );
     }
});

let DailyGrosses = React.createClass({
    getInitialState() {
        return {
            selected: null,
            statusMessage: '',
            statusMessageDuration: 5000
        };
    },
    onRowSelect() {
    },
    render() {
        let dt = moment(this.props.start);
        let data = groupByPerson(this.props.data);
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Header start={this.props.start}/>
                    <Snackbar
                      open={!!this.state.statusMessage}
                      message={this.state.statusMessage}
                      autoHideDuration={this.state.statusMessageDuration}
                      onRequestClose={() => {
                          this.setState({statusMessage: ''});
                      }}
                    />
                </div>
            </MuiThemeProvider>
        );
    },
    renderRow(data, i) {
        let l = data.grosses.slice(0,6);
        let gross = l.reduce((p,c) => {return p + c.amount;}, 0);
        let rent = l.reduce((p,c) => {return p + (c.amount*(1-c.rent));}, 0);
        let net = l.reduce((p,c) => {return p + (c.amount*c.rent);}, 0);
        return (
            <TableRow key={data.id}
                selected={!!this.state.selected && this.state.selected.id==data.id}>
                <TableRowColumn>{data.name}</TableRowColumn>
                {_.range(6).map((n,i) => {
                    return (
                        <TableRowColumn key={l[i].id}><FormattedNumber value={l[i].amount} format="USD" /></TableRowColumn>
                        //<TableRowColumn id={n.toString()} key={n}><NumberInput value={l[i].amount.toFixed(2)} /></TableRowColumn>
                        //<TableRowColumn id={n.toString()} key={n}><TextField value={l[i].amount.toFixed(2)} /></TableRowColumn>
                    );
                })}
                <TableRowColumn><FormattedNumber value={gross} format="USD" /></TableRowColumn>
                <TableRowColumn><FormattedNumber value={rent} format="USD" /></TableRowColumn>
                <TableRowColumn><FormattedNumber value={net} format="USD" /></TableRowColumn>
            </TableRow>
        );
    }
});

module.exports = DailyGrosses;
