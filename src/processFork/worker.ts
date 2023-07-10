// in this file, when main file forked child proc send stuff
// we use the default event `message` to listen and invoke the cb(handler) in this case
import { Task } from './task'

process.on('message', handler)

function handler(msg: { sum: number, set: number[] }) {
  const subsetSum = new Task(msg.sum, msg.set)

  subsetSum.on('match', data => {
    if (process.send) {
      // send to parent when we got the result
      process.send({ event: 'match', data: data })
    }

  })

  subsetSum.on('end', data => {
    if (process.send) {
      // send to parent when we receive the end event
      process.send({ event: 'end', data: data })
    }
  })

  subsetSum.start()
}

if (process.send) {
// just send ready to parent to notify the child process is up
  process.send('ready')
}
