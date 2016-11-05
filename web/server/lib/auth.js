'use strict'
var config = require('config'),
    oauth = require('../../../services/services/oauth2'),
    log = require('../lib/log');

module.exports = (restricted) => {
    return (req,res,next) => {
        if (!restricted) {
            next && next();
            return Promise.accept(true);
        }

        if (!req.user || !req.user.token) {
            log.error('Authentication failed: Token missing');
            res.status(401).send('Invalid credentials');
            return Promise.reject(false);
        }
        let token = req.user.token;

        // validate token with service
        log.trace('Verify Token: ' + token);
        return oauth.authorize({
            scheme: 'Bearer',
            credentials: token
        })
        .then((res) => {
            if (!res) {
                throw 'not authorized';
            }
            log.trace('Token verified: ' + token);
            next && next();
        })
        .catch((err) => {
            log.error('Authentication failed: Token invalid');
            return res.status(401).send('Token invalid');
        });
    }
}
