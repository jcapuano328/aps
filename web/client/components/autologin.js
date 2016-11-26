if (process.env.NODE_ENV === 'production') {
  module.exports = require('./autologin.prod')
} else {
  module.exports = require('./autologin.dev')
}
