import zeromq from 'zeromq'
import { ZmqMiddlewareManager } from './zmqMiddlewareManager.mjs'
import {dirname} from 'path'
import { jsonMiddleware } from './jsonMiddleware.mjs'
import { zlibMiddleware } from './zlibMiddleware.mjs'
import { fileURLToPath } from 'url'

async function main () {
  // const filePath = (fileURLToPath(import.meta.url))
  // const fileName = filePath.split('/').slice(-1)[0]
  // console.log(fileName)

  const clientId = process.argv[2]
  console.log("=====> clientId: ", clientId);

  const socket = new zeromq.Request()
  await socket.connect('tcp://127.0.0.1:5000')

  const zmqm = new ZmqMiddlewareManager(socket)
  zmqm.use(zlibMiddleware())
  zmqm.use(jsonMiddleware())

  zmqm.use({
    // from client perspective, inbound means the server sent msg back to client
    inbound (message) {
      console.log('Echoed back', message)
      return message
    }
  })

  setInterval(() => {
    zmqm.send({ action: `${clientId}`, msg: `msg from ${clientId}` })
      .catch(err => console.error(err))
  }, 1000)

  console.log('Client connected')
}

main()
