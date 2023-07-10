import { ChildProcess, Serializable } from 'child_process'
import { RequestData } from './createReplyTask'
import crypto from 'crypto'

type UUID = `${string}-${string}-${string}-${string}-${string}`
export type ReplyData = { sum: number }


// The createRequestChannel() is a factory
// that wraps the input channel/process and returns a sendRequest() function
// that used to send a request and receive a reply.
export function createRequestTask(proc: ChildProcess) {
  // The magic of the pattern lies in the correlationMap variable,
  // which stores the association between the outgoing requests and their reply handlers.
  const correlationMap = new Map() // key is correlationId, value is its cleanup_cb

  // The sendRequest() function is used to send new requests.
  // Its job is to generate a correlation ID
  // and then wrap the request data in an envelope that allows us to specify the correlation ID and the type of the message.
  // The correlation ID and the handler responsible for returning the reply data to the caller
  // (which uses resolve() under the hood) are then added to the correlationMap
  // so that the handler can be retrieved later using the correlation ID.
  // We also implemented a very simple request timeout logic.
  function sendRequest(data: RequestData) {
    console.log('Sending request', data)

    // as long as we have some async primitive in JS -> it's better to wrap into the promise
    // so we can handle async in promise way for the caller side
    // in this case, we have setTimeout here
    return new Promise((resolve, reject) => {

      const correlationId: UUID = crypto.randomUUID()

      // 下面兩段為 cleanup logic setup
      const replyTimeout = setTimeout(() => {
        correlationMap.delete(correlationId)
        reject(new Error('Request timeout'))
      }, 10 * 1000) // 10 sec


      const cleanUp = (replyData: ReplyData) => {
        correlationMap.delete(correlationId)
        clearTimeout(replyTimeout)
        resolve(replyData)
      }

      correlationMap.set(correlationId, cleanUp)

      // this will send to forked process
      proc.send({
        type: 'request',
        data,
        id: correlationId
      })


    })
  }

  // When the factory is invoked, we also start listening for incoming messages.
  // If the correlation ID of the message (contained in the inReplyTo property)
  // matches any of the IDs contained in the correlationMap map, we know that we just received a reply,
  // so we obtain the reference to the associated response handler
  // and we invoke it with the data contained in the message.
  proc.on('message', (message: { inReplyTo: UUID, data: RequestData }) => {
    const cleanUpCb = correlationMap.get(message.inReplyTo)
    if (cleanUpCb) {
      cleanUpCb(message.data)
    }
  })

  return sendRequest
}
