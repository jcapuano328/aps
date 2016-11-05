'use strict'
var config = require('config'),
    oauth = require('../../../services/services/oauth2'),
    login = require('../../../services/services/login'),
    jwt = require('jsonwebtoken'),
    log = require('../lib/log');

module.exports = [
    {
        method: 'post',
        uri: '/login',
        protected: false,
        handler: (req,res,next) => {
            log.debug('Login User');
            return new Promise((resolve,reject) => {
                if (!req.body.username || !req.body.password) {
                    log.error('Credentials misssing');
                    return reject('Credentials misssing');
                }
                resolve({username: req.body.username, password: req.body.password});
            })
            .then((credentials) => {
                let username = credentials.username;
                let password = credentials.password;
                log.trace('Authenticate User ' + username);
                log.trace('Post to auth services');
                return login(username, password)
                .then((user) => {
                    log.trace('User ' + user.username + ' authenticated');
                    let url = config.services.host + config.services.auth.grant;
                    return oauth.grant({
                        grant_type: 'password',
                        username: username,
                        password: password
                    })
                    .then((authtoken) => {
                        let token = authtoken.access_token;
                        log.trace(token);
                        log.trace('Generate the JWT');
                        return new Promise((resolve,reject) => {
                            jwt.sign({user: user, token: token}, config.session.secret, {}, resolve);
                        });
                    });
                });
            })
            .then((jwttoken) => {
                log.debug('Authentication succeeded');
                log.trace(jwttoken);
                res.status(200).send(jwttoken);
            })
            .catch((err) => {
                log.error('Authentication failed: Token invalid. ' + err);
                return res.status(401).send(err);
            });
        }
    },
    {
        method: 'post',
        uri: '/logout',
        protected: false,
        handler: (req,res,next) => {
            //
            return next();
        }
    }

];
