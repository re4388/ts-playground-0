// a client side to connect to the server
// Path: src/servers/socket/client.ts

import http from 'http'

http
  .request(
    {
      socketPath: './http.sock',
      path: '/ping',
      method: 'GET'
    },
    (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        console.log(`response: `, data)
      })
    }
  )
  .end()

// or use curl:
// curl --unix-socket ./http.sock http://localhost/ping
