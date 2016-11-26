import types from '../constants/actionTypes';
import jwtDecode from 'jwt-decode';

let defaultAuth = { // the logged in user
    loggedin: false,
    firstname: null,
    lastname: null,
    email: null,
    roles: {},
    token: null
};

module.exports = (state = defaultAuth, action) => {
    switch (action.type) {
    case types.LOGIN_SUCCESS:
        let decoded = jwtDecode(action.value);
        return {
            ...state,
            loggedin: !!decoded.token,
            firstname: decoded.user.firstname,
            lastname: decoded.user.lastname,
            email: decoded.user.email,
            roles: decoded.user.roles,
            token: decoded.token
        };

    case types.LOGIN_FAILURE:
        return {
            ...state,
            loggedin: false,
            firstname: null,
            lastname: null,
            email: null,
            roles: null,
            token: null
        };

    case types.LOGOUT:
        return {
            ...state,
            loggedin: false,
            firstname: null,
            lastname: null,
            email: null,
            roles: null,
            token: null
        };

    default:
        return state;
    }
}
