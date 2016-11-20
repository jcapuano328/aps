import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import {Grid, Row, Col} from 'react-flexbox-grid/lib';
import {FormattedNumber} from 'react-intl';
import NumberInput from 'material-ui-number-input';
import Snackbar from 'material-ui/Snackbar';
import muiTheme from '../services/muitheme';
import grosses from '../services/grosses';
//import {groupByPerson} from '../services/grosses';

/*
    Name      Gross   Rent    Net

 */
let DailyGrosses = React.createClass({
    getInitialState() {
        return {
            grosses: [],
            statusMessage: '',
            statusMessageDuration: 5000
        };
    },
    onRefresh() {
        console.log('fetch ' + this.props.unit + ' grosses starting ' + this.props.start);
        grosses.fetch(this.props.start,this.props.unit)
        .then((data) => {
            console.log('Retrieved ' + data.length + ' grosses');
            this.setState({grosses: data});
        })
        .catch((err) => {
            this.setState({statusMessage: err.message || err});
            console.error(err);
        });
    },
    onChange() {

    },
    onRequestValue() {

    },
    render() {
        let data = grosses.groupByPerson(this.state.grosses);
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Grid>
                        {this.renderHeader(data)}
                        {data.map(this.renderRow)}
                        {this.renderFooter(data)}
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
        return (
            <Row key={1} middle="md" center="md">
                <Col md={3}><b>{''}</b></Col>
                <Col md={1}><b>Gross</b></Col>
                <Col md={1}><b>Rent</b></Col>
                <Col md={1}><b>Net</b></Col>
            </Row>
        );
    },
    renderRow(data, i) {
        let l = data.grosses.slice(0,1);
        let gross = l.reduce((p,c) => {return p + c.amount;}, 0);
        let rent = l.reduce((p,c) => {return p + (c.amount*(1-c.rent));}, 0);
        let net = l.reduce((p,c) => {return p + (c.amount*c.rent);}, 0);
        return (
            <Row key={data.id} middle="md" center="md">
                <Col md={3}><b>{data.name}</b></Col>
                <Col md={1}>
                    <NumberInput id={data.id} style={{width:''}} inputStyle={{textAlign:'center'}} value={gross.toFixed(2)}
                        onChange={this.onChange(data)}
                        onRequestValue={this.onRequestValue(data)}
                    />
                </Col>
                <Col md={1}><FormattedNumber value={rent} format="USD" /></Col>
                <Col md={1}><FormattedNumber value={net} format="USD" /></Col>
            </Row>
        );
    },
    renderFooter(data) {
        let gross = data.reduce((g,e) => {
            return e.grosses.slice(0,1).reduce((p,c) => {return p + c.amount;}, g);
        }, 0);
        let rent = data.reduce((g,e) => {
            return e.grosses.slice(0,1).reduce((p,c) => {return p + (c.amount*(1-c.rent));}, g);
        }, 0);
        let net = data.reduce((g,e) => {
            return e.grosses.slice(0,1).reduce((p,c) => {return p + (c.amount*c.rent);}, g);
        }, 0);
        return (
            <Row middle="md" center="md" style={{marginTop: '5%'}}>
                <Col md={3}><b>{'Totals'}</b></Col>
                <Col md={1}><b><FormattedNumber value={gross} format="USD" /></b></Col>
                <Col md={1}><b><FormattedNumber value={rent} format="USD" /></b></Col>
                <Col md={1}><b><FormattedNumber value={net} format="USD" /></b></Col>
            </Row>
        );

    }
});

module.exports = DailyGrosses;
