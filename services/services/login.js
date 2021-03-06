'use strict'
var users = require('../lib/repository')('users'),
    passwordSvc = require('../lib/password'),
    log = require('../lib/log');

module.exports = (username,password) => {
    log.info('Authenticate user');
    log.trace(username + '/' + password);
    return users.select({username: username})
    .then((data) => {
        let user = data && data.length > 0 ? data[0] : null;
        if (!user) {
            throw {type: 'process', message: 'User not found'};
        }
        if (user.status.toLowerCase() === 'locked') {
            throw {type: 'process', message: 'Account is locked'};
        }
        if (user.status.toLowerCase() === 'inactive') {
            throw {type: 'process', message: 'Account is inactive'};
        }

        log.debug('user found, verify password');
        return passwordSvc.verify(password, user.password.salt, user.password.hash)
        .then((valid) => {
            if (!valid) {
                throw {type: 'process', message: 'Invalid Username/Password'};
            }
            log.debug('User ' + username + ' authenticated');
            return user;
        });
    })
    .catch((err) => {
        log.error(err.message || err);
        throw err;
    });
}
