import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import {Grid, Row, Col} from 'react-flexbox-grid/lib';
import {FormattedNumber} from 'react-intl';

/*
    Name      Mon     Tue     Wed     Thu     Fri     Sat     Gross   Rent    Net

 */
let WeeklyGrosses = React.createClass({
    getInitialState() {
        return {
            selected: null
        };
    },
    onRowSelect() {
    },
    render() {
        let dt = moment(this.props.start);
        return (
            <Grid><Row><Col>
            <Table onRowSelection={this.onRowSelect}>
                <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
                        {_.range(6).map((n) => {
                            dt.add(1,'d');
                            let dow = dt.format('ddd');
                            let md = dt.format('MM/DD');
                            return (
                                <TableHeaderColumn key={n} tooltip={md}>
                                    <p>{dow}</p>
                                    <p>{md}</p>
                                </TableHeaderColumn>
                            );
                        })}
                        <TableHeaderColumn tooltip="Total Gross for the Week">Gross</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Total Rent for the Week">Rent</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Net for the Week">Net</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody stripedRows={false} displayRowCheckbox={false} deselectOnClickaway={false}>
                    {this.props.grosses.map(this.renderRow)}
                </TableBody>
            </Table>
            </Col></Row></Grid>
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
                {l.map((n,i) => {
                    return (
                        <TableRowColumn key={n.id}><FormattedNumber value={n.amount} format="USD" /></TableRowColumn>
                    );
                })}
                <TableRowColumn><FormattedNumber value={gross} format="USD" /></TableRowColumn>
                <TableRowColumn><FormattedNumber value={rent} format="USD" /></TableRowColumn>
                <TableRowColumn><FormattedNumber value={net} format="USD" /></TableRowColumn>
            </TableRow>
        );
    }
});


const mapStateToProps = (state) => ({
    start: state.filter.start,
    grosses: state.grosses
});

module.exports = connect(
  mapStateToProps
)(WeeklyGrosses);
