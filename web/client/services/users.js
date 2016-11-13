import fetch from 'node-fetch';
import auth from './auth';
import UrlPattern from 'url-pattern';
import {BASE_URL, USERS_URL, USER_URL, PASSWORD_RESET_URL} from '../constants/rest';
import toJson  from './tojson';

module.exports = {
    getAll() {
        let token = auth.getToken();
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
    get(userid) {
        let token = auth.getToken();
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
    save(user, isnew) {
        let token = auth.getToken();
        let pattern = new UrlPattern(isnew ? USERS_URL: USER_URL);
        let url = BASE_URL + pattern.stringify({id: user.userid});
        let method = isnew ? 'post' : 'put';
        return fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(user)
        })
        .then(toJson);
    },
    remove(user) {
        let token = auth.getToken();
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
    resetPassword(user, currentpwd, newpwd, confirmpwd) {
        let token = auth.getToken();
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
