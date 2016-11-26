var crypto = require('crypto');
var gravataruri = 'http://www.gravatar.com/avatar/';

module.exports = (email) => {
    email = email || '';
    let hash = crypto.createHash('md5').update(email).digest("hex");
    return gravataruri + hash;
}
