import WebSocket from 'ws'

// how to run?
// cd into this folder and use ts-node to run
export function webSocketServer() {
  const wss = new WebSocket.Server({ port: 8080 })

  // Store connected clients
  const clients: WebSocket[] = []

  wss.on('connection', (ws: WebSocket) => {
    // Add new client to the list
    clients.push(ws)

    // ws listen on "message" event from connected client
    // this is like, when Ben Hu send a msg to facebook in a chat room
    // everyone, in that chat room, receive this msg
    ws.on('message', (message: string) => {
      // Broadcast received message to all connected clients
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message)
        }
      })
    })

    // ws listen on "close" event from connected client
    ws.on('close', () => {
      // Remove closed client from the list
      const index = clients.indexOf(ws)
      if (index !== -1) {
        clients.splice(index, 1)
      }
    })
  })
}

webSocketServer()
