import http from 'http'

http
  .createServer((req, res) => {
    console.log('request url', req.url)

    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('hello world\n')
  })
  .listen('./http.sock', () => {
    console.log('Server listening on ./http.sock')
  })
