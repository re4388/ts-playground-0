import { fork } from 'child_process'
import { join } from 'path'
import { once } from 'events'
import { createRequestTask, ReplyData } from './createRequestTask'


export async function run_Correlation_Id_pattern_MAIN() {

  // The requestor starts the replier
  // and then passes its reference to our createRequestChannel() abstraction.
  const childProcess = fork(join(__dirname, 'reply.ts'))
  const requestTask = createRequestTask(childProcess)

  try {

    // We then wait for the child process to be available
    const [message] = await once(childProcess, 'message')

    console.log(`Child process initialized: ${message}`)


    // run a couple of sample requests
    //
    //
    // async await is not sutiable int this case
    // => this is why we still need to master promise!
    // the reason:
    // aync and await make code sync-like
    // but here, we want to know that delay: 500 is slower then delay:100
    // so the 500 code block will run later but at the front block

    const p1 = requestTask({ a: 1, b: 2, delay: 500 })
      // resolve is the onFulfill cb in then
      .then((res) => {
        const resTyped = <{ sum: number }>res
        console.log(`Reply: 1 + 2 = ${resTyped.sum}`)  // run second
      })

    const p2 = requestTask({ a: 6, b: 1, delay: 100 })
      .then((res) => {
        const resTyped = <{ sum: number }>res
        console.log(`Reply: 6 + 1 = ${resTyped.sum}`)  // run first
      })


    // Finally, we wait for both requests to complete
    await Promise.all([p1, p2])

  } finally {
    // Closes the IPC channel between parent and child,
    // allowing the child to exit gracefully once there are no other connections keeping it alive.
    childProcess.disconnect()
  }
}


