import * as net from 'net'

const server = net
  .createServer((socket) => {
    socket.on('data', (data) => {
      console.log('Received:', data.toString())
    })
  })
  .listen('./server.sock', () => {
    console.log('Server listening on ./server.sock')
  })
