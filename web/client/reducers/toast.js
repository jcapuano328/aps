import types from '../constants/actionTypes';

let defaultToast = {
    active: false,
    message: '',
    duration: 5000
};

module.exports = (state = defaultToast, action) => {
    switch (action.type) {
    case types.TOAST:
        return {
            ...state,
            active: !!action.message,
            message: action.message || '',
            duration: action.duration || state.duration
        };

    default:
        return state;
    }
}
