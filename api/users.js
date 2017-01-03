'use strict';

const redisFactory = require('../lib/redis-factory');
const userFactory = require('../lib/models/user');
const middleware = require('../lib/middleware');
const redisMW = middleware.redis;

module.exports.get = middleware([redisMW], (event, context, callback) => {
  console.info('GET /users/{id}');

  const redis = context.redis;
  const User = userFactory(redis);
  const userId = event.pathParameters.id;

  return User.get(userId)
    .then(user => callback(null, {
      statusCode: 200,
      body: JSON.stringify(user),
    }))
    .catch(/* UserNotFoundError, */ err => callback(null, {
      statusCode: 404,
      body: JSON.stringify({ message: err.message }),
    }));
});

module.exports.update = (event, context, callback) => {
  // TODO
};


module.exports.delete = (event, context, callback) => {
  // TODO
};

module.exports.create = (event, context, callback) => {
  console.info('POST /users');

  const redis = redisFactory();
  const User = userFactory(redis);
  const data = JSON.parse(event.body);

  return User.create(data.id, data.username)
    .then(user => callback(null, {
      statusCode: 200,
      body: JSON.stringify(user),
    }))
    .finally(() => redis.quit());
};


module.exports.list = (event, context, callback) => {
  console.info('GET /users');

  const redis = redisFactory();
  const User = userFactory(redis);

  return User.list()
    .then(users => callback(null, {
      statusCode: 200,
      body: JSON.stringify(users),
    }))
    .finally(() => redis.quit());
};
