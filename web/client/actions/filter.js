import types from '../constants/actionTypes';

export const setStart = (dt) => (dispatch) => {
    dispatch({type: types.SET_FILTER_START, value: dt});
}
export const setNow = () => (dispatch) => {
    dispatch({type: types.SET_FILTER_START_NOW});
}
export const previousStart = () => (dispatch) => {
    dispatch({type: types.CHANGE_FILTER_START, value: -1});
}
export const nextStart = () => (dispatch) => {
    dispatch({type: types.CHANGE_FILTER_START, value: 1});
}
export const setUnit = (u) => (dispatch) => {
    dispatch({type: types.SET_FILTER_UNIT, value: u});
}
