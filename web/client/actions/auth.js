'use strict'
import types from '../constants/actionTypes';
import auth from '../services/auth';
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
