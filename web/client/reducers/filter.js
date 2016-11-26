import moment from 'moment';
import types from '../constants/actionTypes';

let defaultFilter = {
    start: null,
    unit: 'day',
    units: [
        {value: 'day',description: 'Daily'},
        {value: 'week',description: 'Weekly'},
        {value: 'month',description: 'Monthly'},
        {value: 'year',description: 'Yearly'}
    ],
    refresh: false
};
let dt = moment();
dt.startOf(defaultFilter.unit);
defaultFilter.start = dt.toDate();

module.exports = (state = defaultFilter, action) => {
    switch (action.type) {
    case types.SET_FILTER_START:
        let dt = moment(action.value);
        dt.startOf(state.unit);
        return {
            ...state,
            start: dt.toDate()
        };
    case types.SET_FILTER_START_NOW:
        let dtn = moment();
        dtn.startOf(state.unit);
        return {
            ...state,
            start: dtn.toDate()
        };

    case types.CHANGE_FILTER_START:
        var dt = moment(state.start);
        dt.startOf(state.unit);
        let unit = 'd';
        switch (state.unit) {
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
        dt.add(action.value, unit);
        return {
            ...state,
            start: dt.toDate()
        };

    case types.SET_FILTER_UNIT:
        return {
            ...state,
            unit: action.value
        };

    default:
        return state;
    }
}
