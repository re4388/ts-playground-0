/**
 * Once this is running open your browser and hit http://localhost
 * You'll see that the request hits the tcp server and you get the HTML back
 */

import net from 'net'
import http from 'http'

export function port_forwarding() {
  const tcp_port = 80
  const http_server_port = 8080

  let httpServer = http.createServer((req, res) => {
    switch (req.url) {
      case '/':
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end('<html><body><p>Ciao!</p></body></html>')
        break
      default:
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('404 Not Found')
    }
  })

  httpServer.listen(http_server_port)

  let tcpServer = net.createServer((socket) => {
    socket.on('data', (message) => {
      console.log('got message', message.toString())

      let serviceSocket = new net.Socket()

      serviceSocket.connect(http_server_port, 'localhost', () => {
        serviceSocket.write(message)
        console.log('connect and send message to the http server')
      })

      serviceSocket.on('data', (data) => {
        console.log('Receiving message from the http server', data.toString())
        socket.write(data)
      })
    })
  })

  tcpServer.listen(tcp_port)
}
