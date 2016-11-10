import fetch from 'node-fetch';
import {LOGIN_URL} from '../constants/rest';
import jwtDecode from 'jwt-decode';

module.exports = {
    login(username, password) {
        return new Promise((resolve,reject) => {
            if (!username || !password) {
                return reject('Invalid credentials');
            }
            resolve();
        })
        .then(() => {
            return fetch(LOGIN_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            });
        })
        .then((response) => {
            return response.text();
        })
        .then((jwt) => {
            if (jwt == 'Unauthorized') {
                throw jwt;
            }
            localStorage.setItem('jwt', jwt);
            this.onChange(true, jwtDecode(jwt));
        })
        .catch((err) => {
            //console.error(err);
            localStorage.removeItem('jwt');
            this.onChange(false);
            throw err;
        });
    },

    logout() {
        return new Promise((resolve,reject) => {
            localStorage.removeItem('jwt');
            this.onChange(false);
            resolve();
        });
    },

    getToken() {
        var token = localStorage.getItem('jwt');
        return token && token != 'Unauthorized' ? token : null;
    },

    getUser() {
        let token = this.getToken();
        if (token) {
            return jwtDecode(token);
        }
        return {};
    },

    loggedIn() {
        return !!this.getToken();
    },

    isInRole(roles) {
        roles = typeof roles === 'array' ? roles : [roles];
        let user = this.getUser();
        return roles.some((role) => {
            let uroles = user.user.roles || [];
            return uroles.indexOf(role) >= 0;
        });
    },

    onChange() {}
};
