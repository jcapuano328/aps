import types from '../constants/actionTypes';

export const setDay = () => (dispatch) => {
    dispatch({type: types.SET_FILTER_UNIT, value: 'day'});
}
export const setWeek = () => (dispatch) => {
    dispatch({type: types.SET_FILTER_UNIT, value: 'week'});
}
export const setMonth = () => (dispatch) => {
    dispatch({type: types.SET_FILTER_UNIT, value: 'month'});
}
export const setYear = () => (dispatch) => {
    dispatch({type: types.SET_FILTER_UNIT, value: 'year'});
}
export const setStart = (dt) => (dispatch) => {
    dispatch({type: types.SET_FILTER_START, value: dt});
}
