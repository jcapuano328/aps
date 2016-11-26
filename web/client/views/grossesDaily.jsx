import React from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import {Grid, Row, Col} from 'react-flexbox-grid/lib';
import {FormattedNumber} from 'react-intl';
import NumberInput from 'material-ui-number-input';

/*
    Name      Gross   Rent    Net

 */
let DailyGrosses = React.createClass({
    onChange() {

    },
    onRequestValue() {

    },
    render() {
        return (
            <Grid>
                {this.renderHeader(this.props.grosses)}
                {this.props.grosses.map(this.renderRow)}
                {this.renderFooter(this.props.grosses)}
            </Grid>
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

const mapStateToProps = (state) => ({
    grosses: state.grosses
});

module.exports = connect(
  mapStateToProps
)(DailyGrosses);
