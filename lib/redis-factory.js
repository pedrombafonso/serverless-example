'use strict';

const Bluebird = require('bluebird');
const redis = Bluebird.promisifyAll(require('redis'));

module.exports = () => redis.createClient({
  host: process.env.DOCKER ? 'redis' : 'redis.8vitgg.ng.0001.euw1.cache.amazonaws.com',
});
