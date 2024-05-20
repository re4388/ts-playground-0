import http from 'http'

// take the first argument as the port number
const http_server_port = process.argv[2] || 3002
let httpServer = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      const remoteAddress = req.connection.remoteAddress
      console.log('Incoming request from:', remoteAddress)
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(`<html><body><p>Hello, Ben Hu. port: ${http_server_port}</p></body></html>`)
      break
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end(`Not Found at ${http_server_port}`)
  }
})

httpServer
  .listen(http_server_port, async () => {
    // debugger
    console.log(`Server is running at http://localhost:${http_server_port}`)
  })
  .on('error', (err) => {
    console.error('Server error:', err)
  })
