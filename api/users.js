'use strict';

const User = require('../lib/models/user');

module.exports.get = (event, context, callback) => {
  console.info('GET /users/{id}');

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
    }));
};

module.exports.update = (event, context, callback) => {
  // TODO
};


module.exports.delete = (event, context, callback) => {
  // TODO
};

module.exports.create = (event, context, callback) => {
  console.info('POST /users');

  const data = JSON.parse(event.body);

  return User.create(data.id, data.username)
    .then(user => callback(null, {
      statusCode: 200,
      body: user,
    }));
};


module.exports.list = (event, context, callback) => {
  console.info('GET /users');

  return User.list()
    .then(users => callback(null, {
      statusCode: 200,
      body: users,
    }));
};
