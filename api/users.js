'use strict';

module.exports.get = (event, context, callback) => {
  console.info('GET /users/{id}');
  const User = require('../lib/models/user');
  const redis = require('../lib/redis-client');

  const userId = event.pathParameters.id;

  return User.get(userId)
    .then(user => callback(null, {
      statusCode: 200,
      body: user,
    }))
    .catch(/* UserNotFoundError, */ err => callback(null, {
      statusCode: 404,
      body: {
        message: err.message,
      },
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
  const User = require('../lib/models/user');
  const redis = require('../lib/redis-client');

  const data = JSON.parse(event.body);

  return User.create(data.id, data.username)
    .then(user => callback(null, {
      statusCode: 200,
      body: user,
    }))
    .finally(() => redis.quit());
};


module.exports.list = (event, context, callback) => {
  console.info('GET /users');
  const User = require('../lib/models/user');
  const redis = require('../lib/redis-client');

  return User.list()
    .then(users => callback(null, {
      statusCode: 200,
      body: users,
    }))
    .finally(() => redis.quit());
};
