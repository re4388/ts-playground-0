#!/usr/bin/env node
// npm install ioredis@4.17
const Redis = require('ioredis');
const redis = new Redis('localhost:6380');

(async () => {


  /**
   * The ioredis package represents the result of these commands as an array, which the application destructures into two variables.
   * Each of these variables is also an array, with the first element being an error state (null in this case)
   * and the second being the result of the command (1 in this case).
   */
  const [res_srem, res_hdel] = await redis.multi()
    .srem("employees", "42") // removes an employee from a set
    .hdel("employee-42", "company-id") // removes the employee’s company ID from a hash
    .exec();

  console.log('srem?', !!res_srem[1], 'hdel?', !!res_hdel[1]);

  redis.quit();

})();



// how to run?
// $ docker exec distnode-redis redis-cli SADD employees 42 tlhunter
// $ docker exec distnode-redis redis-cli HSET employee-42 company-id funcorp
// $ node redis/transaction.js
// > srem? true hdel? true
