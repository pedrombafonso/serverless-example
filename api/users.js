'use strict';

const redisFactory = require('../lib/redis-factory');
const userFactory = require('../lib/models/user');

module.exports.get = (event, context, callback) => {
  console.info('GET /users/{id}');

  const redis = redisFactory();
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
    }))
    .finally(() => redis.quit());
};

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
