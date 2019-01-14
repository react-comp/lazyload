if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/lazyload.production.min');
} else {
  module.exports = require('./dist/lazyload.development');
}
