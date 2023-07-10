// a factory that returns another function used to register new reply handlers.

import { Serializable } from 'child_process'


export interface RequestData {
  a: number,
  b: number,
  delay: number
}


export interface Message {
  type: string
  data: any
  id: string
}

export function createReplyTask(proc: NodeJS.Process) {

  // like task pattern: ret fn can call later
  return function sendReply(handler: Function) {

    proc.on('message', async (message: Message) => {
      if (message.type !== 'request') {
        return
      }

      // When we receive a new request,
      // we immediately invoke the handler and passing the data contained in the message.


      // Once the handler has done its work and returned its reply,
      // we build an envelope around the data and include the type of the message and the correlation ID
      // of the request (the inReplyTo property), then we put everything back into the channel.
      const replyData = await handler(message.data)

      if (proc.send) {
        proc.send({
          type: 'response',
          data: replyData,
          inReplyTo: message.id
        })
      }

    })
  }
}
