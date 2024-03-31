import {writeJsonFile} from 'write-json-file';

// 1. the most simple form
// import got from 'got';
// const url = 'https://httpbin.org/anything';
// const response = await got(url);
// console.log("------->response: ", response);


// 2. ez to cover the result to json
// import got from 'got';
// const url = 'https://httpbin.org/anything';
// const data = await got(url).json();
// console.log("------->data: ", data);


// 3. you can add ur custom headers, and set timeout, 3.5 sec will fail
// import got from 'got';
//
// const url = 'https://httpbin.org/anything';
//
// const options = {
//   headers: {
//     'Custom-Header': 'Quick start',
//   },
//   timeout: {
//     send: 3500
//   },
// };
// const data = await got(url, options).json();
// console.log("------->data: ", data);


// 4. easy to pass json stuff in POST (fetch need to use JSON.stringify)
// import got from 'got';
//
// const url = 'https://httpbin.org/anything';
//
// const options = {
//   json: {
//     documentName: 'Quick Start',
//   },
// };
//
// const data = await got.post(url, options).json();
// //@ts-ignore
// console.log("------->data: ", data);


// 5. can integrate with plugin to

// @ts-ignore
// import ghGot from 'gh-got';
// import { config } from 'dotenv'
// config();
//
// const token = process.env.GOT_GITHUB_TOKEN
//
// const {body} = await ghGot('users/re4388', {
//   context: {
//     token, // need to apply for token
//   }
// });
//
// console.log(body);


// 6. can use stream!
// import fs from 'node:fs';
// import {pipeline as streamPipeline} from 'node:stream/promises';
// import got from 'got';
//
// const url = 'https://httpbin.org/anything';
// const options = {
//   json: {
//     documentName: 'Quick Start',
//   },
// };
//
// // got.stream will use its stream api, the result is readable stream
// const incomingGotStream = got.stream.post(url, options);
// const destStream = fs.createWriteStream('anything.json');
//
// try {
//   await streamPipeline(incomingGotStream, destStream);
// } catch (error) {
//   console.error(error);
// }

// 7. you can put config at client level
// import got from 'got';
//
// const options = {
//   prefixUrl: 'https://httpbin.org',
//   headers: {
//     Authorization: getTokenFromVault(),
//   },
// };
//
// const client = got.extend(options);
//
// export default client;


// 8. you can get statusCode from error
// import got from 'got';
//
// try {
//   const data = await got.get('https://httpbin.org/status/404');
// } catch (error) {
//   // @ts-ignore
//   console.error(error.response.statusCode); // 404
//   // @ts-ignore
//   console.error(error.response);
// }


// 9. timeout at client level
// It is a good practice to set a timeout to prevent hanging requests.
// By default, there is no timeout set.
// we can set one at client level
// import got from 'got';
// const options = {
//   timeout: {
//     request: 10000,
//   },
// };
// const client = got.extend(options);
// export default client;


// 10. timing
// https://github.com/sindresorhus/got/blob/main/documentation/6-timeout.md#timeout-options
// import got from 'got';
// const {timings, body} = await got('https://news.ycombinator.com/news', {
//   timeout: {
//     lookup: 100,
//     connect: 200,
//     secureConnect: 1000,
//     socket: 1000,
//     send: 10000,
//     response: 1000
//   }
// })

// if timeout error happen, will throw Err, example:
// RequestError: Timeout awaiting 'connect' for 50ms

// Alternatively:
// @ts-ignore
// const {timings} = await got('https://example.com', {
//   timeout: {
//     request: 10000
//   }
// });

// console.log(timings);
// {
// 	start: 1625474926602,
// 	socket: 1625474926605,
// 	lookup: 1625474926610,
// 	connect: 1625474926617,
// 	secureConnect: 1625474926631,
// 	upload: 1625474926631,
// 	response: 1625474926638,
// 	end: 1625474926642,
// 	error: undefined,
// 	abort: undefined,
// 	phases: {
// 		wait: 3,
// 		dns: 5,
// 		tcp: 7,
// 		tls: 14,
// 		request: 0,
// 		firstByte: 7,
// 		download: 4,
// 		total: 40
// 	}
// }
// console.log(body)


// 11. advance timeout
// 12. support http2
// 13. pagination API
// [got/documentation/4-pagination.md at main · sindresorhus/got](https://github.com/sindresorhus/got/blob/main/documentation/4-pagination.md)

// import got from 'got';
// const countLimit = 10;
// const pagination = got.paginate(
//   'https://api.github.com/repos/sindresorhus/got/commits',
//   {
//     pagination: {countLimit}
//   }
// );
//
// console.log(`Printing latest ${countLimit} Got commits (newest to oldest):`);
//
// // Returns an async iterator.
// // This is memory efficient, as the logic is executed immediately when new data comes in.
// for await (const commitData of pagination) {
//   console.log(commitData.commit.message);
// }


// 14. cookie handle
// import got from 'got';
// import {CookieJar} from 'tough-cookie';
//
// const cookieJar = new CookieJar();
// await cookieJar.setCookie('foo=bar', 'https://httpbin.org');
// const a1 = await got('https://httpbin.org/anything', {cookieJar});
// console.log("------->a1: ", Object.keys(a1));
//
// await writeJsonFile('req_0.json', ignoreCirCircularStringify(a1));
//
//
// function ignoreCirCircularStringify(obj:any) {
//   let cache: any[] = [];
//   let str = JSON.stringify(obj, function(key, value) {
//     if (typeof value === "object" && value !== null) {
//       if (cache.indexOf(value) !== -1) {
//         return;
//       }
//       // Store value in our collection
//       cache.push(value);
//     }
//     return value;
//   });
//   //@ts-ignore
//   cache = null; // reset the cache
//   return str;
// }

// 15. composable


// 16. retry support
// https://github.com/sindresorhus/got/blob/main/documentation/7-retry.md
// import got from 'got';
//
// const res = await got('https://httpbin.org/anything', {
//   retry: {
//     attemptCount: 5,
//     retryOptions: {
//
//     },
//     calculateDelay: ({computedValue}) => {
//       return computedValue / 10;
//     }
//   }
// });
// console.log("------->res: ", res);


// 17 hook [got/documentation/9-hooks.md at main · sindresorhus/got](https://github.com/sindresorhus/got/blob/main/documentation/9-hooks.md#hooks-api)
// import got from 'got';
// @ts-ignore
// const logRetry = (error, retryCount) => {
//   console.error(`Retrying after error ${error.code}, retry #: ${retryCount}`);
// };
//
// const options = {
//   hooks: {
//     beforeRetry: [
//       logRetry,
//     ],
//   },
// };
//
// const client = got.extend(options);
// export default client
