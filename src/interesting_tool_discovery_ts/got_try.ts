import got from 'got';

const url = 'https://jsonplaceholder.typicode.com/todos/1';
const response = await got(url);
console.log("------->response: ", response.body);
