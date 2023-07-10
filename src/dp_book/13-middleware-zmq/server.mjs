import zeromq from 'zeromq'
import { ZmqMiddlewareManager } from './zmqMiddlewareManager.mjs'
import { jsonMiddleware } from './jsonMiddleware.mjs'
import { zlibMiddleware } from './zlibMiddleware.mjs'

async function main () {
  const socket = new zeromq.Reply()
  await socket.bind('tcp://127.0.0.1:5000')

  const zmqm = new ZmqMiddlewareManager(socket)

  zmqm.use(zlibMiddleware())
  zmqm.use(jsonMiddleware())

  // we also use middleware to handle incoming msg and send out msg
  zmqm.use({
    async inbound (message) {
      console.log('Received', message)

      // here, we only response to `ping` action
      if (message.action === 'a1') {
        await this.send({ action: 'to a1', msg: message.msg })
      } else if (message.action === 'a2'){
        await this.send({ action: 'to a2', msg: message.msg })
      }
      return message
    }
  })

  console.log('Server started')
}

main()
