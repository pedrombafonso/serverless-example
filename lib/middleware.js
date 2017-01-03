'use strict';


module.exports = (middlewares, fn) => {
  if (!Array.isArray(middlewares)) {
    fn = middlewares;
    middlewares = [];
  }
  return (event, context, callback) => {
    middlewares.forEach(md => {
      md.before(event, context);
    });
    return fn(event, context, (err, data) => {
      middlewares.forEach(md => {
        md.after(event, context, err, data);
      });
      return callback(err, data);
    });
  };
};


// redis middleware
const redisFactory = require('./redis-factory');
module.exports.redis = {
  before: (event, context) => {
    context.redis = redisFactory();
  },
  after: (event, context, err, data) => {
    context.redis.quit();
  },
}
