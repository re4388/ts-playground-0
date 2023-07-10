import { createReplyTask } from './createReplyTask'

const replyTask = createReplyTask(process)

// Our replier simply calculates the sum between the two numbers received in the request
// and returns the result after a certain delay (which is also specified in the request).

// This will allow us to verify that the order of the responses can be different from the order
// in which we sent the requests, to confirm that our pattern is working.
// With the last instruction of the module, we send a message back to the parent process
// to indicate that the child is ready to accept requests.
replyTask(handler)


function handler(req: { a: number, b: number, delay: number }) {

  // why this layer?
  // wrapper setTimeout by using promise, we can go into promise way to handle async op in node.js
  // which is much simpler, like:
  // work w/ async-await if needed
  // you get the .then
  // get promise chain
  // you got all good things in promise, like only settle once and exclusively for resolve or reject
  return new Promise((resolve, reject) => {

    try {
      setTimeout(() => {
        resolve({ sum: req.a + req.b })
      }, req.delay)
    } catch (err) {
      reject(err)
    }


  })
}

// If Node.js is spawned with an IPC channel,
// the process.send() method can be used to send messages to the parent process.
if (process.send) {
  process.send('ready')
}
