'use strict';

const Bluebird = require('bluebird');
const redis = Bluebird.promisifyAll(require('redis'));

module.exports = redis.createClient({
  host: process.env.DOCKER ? 'redis' : '127.0.0.1',
});
