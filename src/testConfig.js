const config = require('config');

// const dbConfig = config.get('Customer.dbConfig');
// console.log("=====> dbConfig: ", dbConfig);
//
// if (config.has('optionalFeature.detail')) {
//   const detail = config.get('optionalFeature.detail');
//   console.log("=====> detail: ", detail);
//   //...
// }

const a1 = config.get('hello');
console.log("=====> a1: ", a1);


// at 11:08:58 ➜ NODE_ENV=production node src/testConfig.js                                                                                                                                      (qat/default)
// =====> a1:  { a1: 'world' }
