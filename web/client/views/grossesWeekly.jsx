import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import {Grid, Row, Col} from 'react-flexbox-grid/lib';
import {FormattedNumber} from 'react-intl';
import NumberInput from 'material-ui-number-input';

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
        return (
            <Grid>
                {this.renderHeader(this.props.start)}
                {this.props.grosses.map(this.renderRow)}
            </Grid>
        );
    },
    renderHeader(start) {
        let dt = moment(start);
        return (
            <Row middle="md" center="md">
                <Col md={3}>Name</Col>
                {_.range(6).map((n) => {
                    dt.add(1,'d');
                    let dow = dt.format('ddd');
                    let md = dt.format('MM/DD');
                    return (
                        <Col key={n} md={1}>
                            <label>{dow}</label>
                            <br/>
                            <label>{md}</label>
                        </Col>
                    );
                })}
                <Col md={1}>Gross</Col>
                <Col md={1}>Rent</Col>
                <Col md={1}>Net</Col>
            </Row>
        );
    },
    renderRow(data, i) {
        let l = data.grosses.slice(0,6);
        let gross = l.reduce((p,c) => {return p + c.amount;}, 0);
        let rent = l.reduce((p,c) => {return p + (c.amount*(1-c.rent));}, 0);
        let net = l.reduce((p,c) => {return p + (c.amount*c.rent);}, 0);
        return (
            <Row key={data.id} middle="md" center="md">
                <Col md={3}>{data.name}</Col>
                {l.map((n,i) => {
                    return (
                        <Col key={n.id} md={1}>
                            <FormattedNumber value={n.amount} format="USD" />
                            {/*<NumberInput value={n.amount.toFixed(2)} />*/}
                        </Col>
                    );
                })}
                <Col md={1}><FormattedNumber value={gross} format="USD" /></Col>
                <Col md={1}><FormattedNumber value={rent} format="USD" /></Col>
                <Col md={1}><FormattedNumber value={net} format="USD" /></Col>
            </Row>
        );
    },
    renderFooter() {
        // total gross, rent, net ??
    }
});


const mapStateToProps = (state) => ({
    start: state.filter.start,
    grosses: state.grosses
});

module.exports = connect(
  mapStateToProps
)(WeeklyGrosses);
