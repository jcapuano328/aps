var config = require('config');
    oauth2 = require('../services/oauth2'),
    router = require('../../lib/router')(config);

module.exports = router(oauth2.authorise);
