import types from '../constants/actionTypes';

module.exports = (state = [], action) => {
    switch (action.type) {
    case types.SET_GROSSES:
        return action.value;

    case types.UPDATE_GROSS:
        return state;

    default:
        return state;
    }
}
