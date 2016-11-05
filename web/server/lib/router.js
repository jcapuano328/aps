var config = require('config'),
    auth = require('./auth'),
    router = require('../../../lib/router')(config);

module.exports = router(auth);
