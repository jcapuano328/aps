import fetch from 'node-fetch';
import {LOGIN_URL} from '../constants/rest';

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
            return jwt;
        });
    },

    logout() {
        return new Promise((resolve,reject) => {
            // surely must post to the server?
            resolve();
        });
    },

    isInRole(user, roles) {
        roles = typeof roles === 'array' ? roles : [roles];
        return roles.some((role) => {
            let uroles = user.user.roles || [];
            return uroles.indexOf(role) >= 0;
        });
    }
};
