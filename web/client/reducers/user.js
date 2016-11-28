import types from '../constants/actionTypes';
import jwtDecode from 'jwt-decode';

let defaultUser = { // the logged in user
    loggedin: false,
    userid: null,
    firstname: null,
    lastname: null,
    email: null,
    roles: {},
    token: null
};

module.exports = (state = defaultUser, action) => {
    switch (action.type) {
    case types.LOGIN_SUCCESS:
        let decoded = jwtDecode(action.value);
        return {
            ...state,
            loggedin: !!decoded.token,
            userid: decoded.user.userid,
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
            userid: null,
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
            userid: null,
            firstname: null,
            lastname: null,
            email: null,
            roles: null,
            token: null
        };

    case types.SET_USERPROFILE:
        return {
            ...state,
            firstname: action.value.firstname,
            lastname: action.value.lastname,
            email: action.value.email
        };

    default:
        return state;
    }
}
