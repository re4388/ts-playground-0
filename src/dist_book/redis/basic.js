#!/usr/bin/env node
// npm install ioredis@4.17
const Redis = require('ioredis');
const redis = new Redis('localhost:6380');


/**
 * the application doesn’t wait for a connection to Redis before sending commands.
 * Internally the ioredis package queues up commands until the connection is ready before dispatching them.
 *
 * This is a convenient pattern used by many database packages.
 * Sending too many commands when an application first runs might constrain resources.
 */

(async () => {

  await redis.set('foo', 'bar');
  const result = await redis.get('foo');
  console.log('result:', result);
  redis.quit();


})();