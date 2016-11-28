import fetch from 'node-fetch';
import auth from './auth';
import UrlPattern from 'url-pattern';
import {BASE_URL, USERS_URL, USER_URL, PASSWORD_RESET_URL} from '../constants/rest';
import toJson  from './tojson';

module.exports = {
    getAll(token) {
        return fetch(BASE_URL + USERS_URL, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(toJson);
    },
    get(userid, token) {
        let pattern = new UrlPattern(!!userid ? USER_URL : USERS_URL);
        let url = BASE_URL + pattern.stringify({id: userid});
        return fetch(url, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(toJson);
    },
    add(user, token) {
        let pattern = new UrlPattern(isnew ? USERS_URL: USER_URL);
        let url = BASE_URL + pattern.stringify({id: user.userid});
        return fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(user)
        })
        .then(toJson);
    },
    update(user, token) {
        let pattern = new UrlPattern(isnew ? USERS_URL: USER_URL);
        let url = BASE_URL + pattern.stringify({id: user.userid});
        return fetch(url, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(user)
        })
        .then(toJson);
    },
    remove(user, token) {
        let pattern = new UrlPattern(USER_URL);
        let url = BASE_URL + pattern.stringify({id: user.userid});
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(toJson);
    },
    resetPassword(user, currentpwd, newpwd, confirmpwd, token) {
        let pattern = new UrlPattern(PASSWORD_RESET_URL);
        let url = BASE_URL + pattern.stringify({id: user.userid});
        return fetch(url, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                currentpwd: currentpwd,
                newpwd: newpwd,
                confirmpwd: confirmpwd
            })
        })
        .then(toJson);
    }
};
