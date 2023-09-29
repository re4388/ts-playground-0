import http from 'http'
const http_server_port= 3001
let httpServer = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      const remoteAddress = req.connection.remoteAddress;
      console.log('Incoming request from:', remoteAddress);
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(`<html><body><p>${http_server_port}</p></body></html>`)
      break
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end(`Not Found at ${http_server_port}`)
  }
})

httpServer.listen(http_server_port)
