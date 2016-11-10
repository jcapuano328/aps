var crypto = require('crypto');
var gravataruri = 'http://www.gravatar.com/avatar/';

module.exports = (user) => {
    var email = user != null ? user.email : '';
    var hash = crypto.createHash('md5').update(email).digest("hex");
    return gravataruri + hash;    
}
