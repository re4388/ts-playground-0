import got from 'got'

// @ts-ignore
// const { data } = await got
//   .post('https://httpbin.org/anything', {
//     json: {
//       hello: 'world'
//     }
//   })
//   .json()

// console.log(data)
//=> {"hello": "world"}



import ghGot from 'gh-got';

const {body} = await ghGot('users/sindresorhus', {
  context: {
    token: 'foo'
  }
});

console.log(body.login);
//=> 'sindresorhus'