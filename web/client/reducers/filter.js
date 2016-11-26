import moment from 'moment';
import types from '../constants/actionTypes';

let defaultFilter = {
    start: null,
    unit: 'day'
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

    case types.SET_FILTER_UNIT:
        return {
            ...state,
            unit: action.value
        };

    default:
        return state;
    }
}
