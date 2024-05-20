import * as fs from 'node:fs/promises'

async function readFromPipe(pipeName: string) {
  while (true) {
    const data = await fs.readFile(pipeName)
    console.log('data from client: ' + data)
  }
}

readFromPipe('/tmp/server.fifo')

// open a terminal:
// while true; do echo "qqq" > /tmp/server.fifo; sleep 1; done
