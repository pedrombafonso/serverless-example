'use strict';

const redis = require('../redis-client');
const Bluebird = require('bluebird');

module.exports = class User {
  constructor(id, username) {
    this.id = id;
    this.username = username;
  }

  static get(id) {
    return redis.hgetallAsync(id)
      .then(data => {
        if (data) {
          return new User(data.id, data.username);
        }
        throw new Error('User not found');
      });
  }

  static create(id, username) {
    return Bluebird.join(
      redis.hmsetAsync(id, 'id', id, 'username', username),
      redis.saddAsync('users', id)
    )
      .then(() => new User(id, username));
  }

  static list() {
    return redis.smembersAsync('users')
      .map(id => redis.hgetallAsync(id)
        .then(data => new User(data.id, data.username))
      );
  }

  save() {
    return redis.hmsetAsync(this.id, 'username', this.username);
  }
};
