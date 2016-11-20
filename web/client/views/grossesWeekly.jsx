import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import {Grid, Row, Col} from 'react-flexbox-grid/lib';
import Snackbar from 'material-ui/Snackbar';
import {FormattedNumber} from 'react-intl';
import NumberInput from 'material-ui-number-input';
import muiTheme from '../services/muitheme';
import {groupByPerson} from '../services/grosses';

/*
    Name      Mon     Tue     Wed     Thu     Fri     Sat     Gross   Rent    Net

 */
let WeeklyGrosses = React.createClass({
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
        let data = groupByPerson(this.props.data);
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Grid>
                        {this.renderHeader(this.props.start)}
                        {data.map(this.renderRow)}
                    </Grid>
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
                {_.range(6).map((n,i) => {
                    return (
                        <Col key={l[i].id} md={1}>
                            <FormattedNumber value={l[i].amount} format="USD" />
                            {/*<NumberInput value={l[i].amount.toFixed(2)} />*/}
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

module.exports = WeeklyGrosses;
