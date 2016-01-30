'use strict';

const Bluebird = require('bluebird');
const assert = require('assert');

const redis = require('../../lib/redis-client');
const usersApi = Bluebird.promisifyAll(require('../../api/users'));


describe('api/users', () => {
  describe('get', () => {
    before(() => Bluebird.join(
        redis.hmsetAsync('1', 'id', '1', 'username', 'username'),
        redis.saddAsync('users', '1')
    ));

    it('should return the user', () =>
      usersApi.getAsync({ pathParameters: { id: '1' } }, null)
        .then(res => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.id, '1');
        })
    );

    it('should return 404 if user does not exist', () =>
      usersApi.getAsync({ pathParameters: { id: '2' } }, null)
        .then(res => {
          assert.equal(res.statusCode, 404);
          assert.ok(res.body.message);
        })
    );
  });

  describe('create', () => { });
});
