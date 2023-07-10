import http from 'http'

import url from 'url'
import * as queryString from 'querystring'
import * as querystring from 'querystring'


// curl http://localhost:8888/start\?foo\=bar\&hello\=world
http.createServer((req, res) => {
  const pathname = url.parse(req.url as string).pathname
  console.log(pathname) // => start


  const query = url.parse(req.url as string).query
  console.log(query) // foo=bar&hello=world


  if (query != null) {
    const q1 = querystring.parse(query)['foo']
    console.log('=====> q1: ', q1) // bar
  }


  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write('Hello World')
  res.end()
}).listen(8888)
console.log('Server has started.')

