import WebSocket from 'ws'

// how to run?
// cd into this folder and use ts-node to run
export function webSocketClient() {
  const ws = new WebSocket('ws://localhost:8080')

  ws.onopen = () => {
    console.log('Connected to the server')

    // Send a test message to the server
    ws.send('Hello, everyone!')
  }

  ws.onmessage = (event: WebSocket.MessageEvent) => {
    const message = event.data.toString()
    console.log('Received message:', message)
  }

  ws.onclose = () => {
    console.log('Connection closed')
  }
}

webSocketClient()
