'use strict'
import types from '../constants/actionTypes';
import auth from '../services/auth';
import users from '../services/users';
import {toast} from './toast';
const TOKEN = 'aps-token';

export const login = (username,password) => (dispatch) => {
    return auth.login(username,password)
    .then((token) => {
        dispatch(loginUserSuccess(token));
    })
    .catch((err) => {
        dispatch(loginUserFail(err));
        toast(err.message || err)(dispatch);
    });
}

export const userToken = () => {
    return localStorage.getItem(TOKEN);
}

export const loginUserSuccess = (token) => {
    localStorage.setItem(TOKEN, token);
    return {type: types.LOGIN_SUCCESS, value: token};
}

export const loginUserFail = (status,message) => {
    localStorage.removeItem(TOKEN);
    return {type: types.LOGIN_FAILURE, value: null};
}

export const logout = () => (dispatch) => {
    return auth.logout()
    .then(() => {
        dispatch(logoutUserSuccess());
    });
}

export const logoutUserSuccess = () => {
    localStorage.removeItem(TOKEN);
    return {type: types.LOGOUT, value: null};
}

export const updateProfile = (user) => (dispatch,getState) => {
    const {usr} = getState();
    return users.get(u.userid, usr.token)
    .then((u) => {
        u.firstname = user.firstname;
        u.lastname = user.lastname;
        u.email = user.email;
        return users.update(u, usr.token);
    })
    .then(() => {
        dispatch({type: types.SET_USERPROFILE, value: {firstname: user.firstname, lastname: user.lastname, email: user.email}});
    });
}

export const resetPassword = (user, currentpwd, newpwd, confirmpwd) => (dispatch,getState) => {
    const {usr} = getState();
    return users.resetPassword(user, currentpwd, newpwd, confirmpwd, usr.token);
}
