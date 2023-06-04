import net from 'net'

export const tcpServer = async () => {
  // Create a TCP server
  const server = net.createServer((socket) => {
    console.log('Client connected')

    // Handle incoming data from the client
    socket.on('data', (data) => {
      console.log('Received data:', data.toString())
      // just echo back the received data back to the client
      socket.write(data)
    })

    // Handle client disconnection
    socket.on('end', () => {
      console.log('Client disconnected')
    })
  })

  // Start the server and listen on a specific port
  server.listen(3000, () => {
    console.log(`Server listening on port 3000`)
  })
}

// use nc as client to try out
// `nc localhost 3000`
