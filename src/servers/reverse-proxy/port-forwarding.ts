/**
 * This code is an example of port forwarding using JavaScript and the Node.js runtime environment. Port forwarding is a technique used to interconnect two networks or devices that use different protocols. In this case, the code demonstrates forwarding TCP traffic to an HTTP server.

Let's break down the code step by step:

The code imports the necessary modules, net and http, from the Node.js standard library. These modules provide functionality for creating TCP and HTTP servers, respectively.

The code creates an HTTP server using the http.createServer() method. This server listens for incoming HTTP requests and handles them based on the requested URL. In this example, if the URL is /, it responds with an HTML page containing the text "Ciao!". Otherwise, it responds with a plain text "404 Not Found" message.

The code specifies the port number for the HTTP server using the variable http_server_port and starts the server by calling httpServer.listen(http_server_port).

Next, the code creates a TCP server using the net.createServer() method. This server listens for incoming TCP connections.

When a TCP connection is established, the code sets up a listener for the data event on the socket. This event is triggered when data is received from the client.

When data is received, the code logs the received message using console.log().

The code creates a new TCP socket, serviceSocket, and connects it to the HTTP server running on localhost at the specified http_server_port.

Once the connection is established, the code sends the received message to the HTTP server by writing it to the serviceSocket.

The code sets up a listener for the data event on the serviceSocket. When data is received from the HTTP server, it logs the received message and sends it back to the client by writing it to the original TCP socket.

The code specifies the port number for the TCP server using the variable tcp_port and starts the server by calling tcpServer.listen(tcp_port).

In summary, this code sets up an HTTP server and a TCP server. When a TCP connection is established, it forwards the received data to the HTTP server and sends the response back to the client. This allows TCP traffic to be handled by an HTTP server.
 */

import net from 'net'
import http from 'http'

// Port forwarding is a technique used to interconnect two networks or devices that use different protocols.

// Creating an HTTP server
let httpServer = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end('<html><body><p>Ciao!</p></body></html>') // Sending an HTML response
      break
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('404 Not Found') // Sending a plain text response
  }
})

const http_server_port = 8080 // Port number for the HTTP server
httpServer.listen(http_server_port) // Starting the HTTP server

// Creating a TCP server
let tcpServer = net.createServer((socket) => {
  socket.on('data', (message) => {
    console.log('got message', message.toString()) // Logging the received message

    let serviceSocket = new net.Socket()

    serviceSocket.connect(http_server_port, 'localhost', () => {
      serviceSocket.write(message) // Sending the message to the HTTP server
      console.log('connect and send message to the http server')
    })

    serviceSocket.on('data', (data) => {
      console.log('Receiving message from the http server', data.toString()) // Logging the received message from the HTTP server
      socket.write(data) // Sending the received message back to the client
    })
  })
})

const tcp_port = 80 // Port number for the TCP server
tcpServer.listen(tcp_port) // Starting the TCP server
