import * as net from 'net'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const client = net.createConnection('./server.sock', async () => {
  while (true) {
    client.write(process.argv[2] || 'Hello, world!')
    await sleep(1000)
  }
})
